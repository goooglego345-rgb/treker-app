import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {User} from "../task/entity/user.entity";
import {JwtService} from "@nestjs/jwt";
import {Task} from "../task/entity/task.entity";
import {TaskController} from "../task/task.controller";
import {TaskDto} from "../task/dto/task.dto";

@Injectable()
export class AuthService {
   constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>,
       private jwtService: JwtService,
       @InjectRepository(Task)
       private tasksRepository: Repository<Task>,
   ){}

    async register(username: string, password: string,task: TaskDto){
       const exitUser = await this.userRepository.findOneBy({username});
       if (exitUser){
           throw new HttpException("Username already exists", HttpStatus.BAD_REQUEST);
       }
        const salt = await bcrypt.genSalt(10);
        const Password = await bcrypt.hash(password, salt);
        const newUser = this.userRepository.create({username: username, password:Password});
        await this.userRepository.save(newUser);
        this.userRepository.create(task);
        const payload = {sub : newUser.id , username: newUser.username};
        return{
            access_token: await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET})
        };
    };
    async singIn(username: string, password: string
    ):Promise<{access_token: string}> {
        const  user = await this.userRepository.findOneBy({username});
        if(!user){
            throw new UnauthorizedException('Username dont find');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            throw new UnauthorizedException("Passwords dont correct");
        }
        const payload = {sub: user.id, username: user.username};
        return{access_token: await this.jwtService.signAsync(payload)}
    }
    async createTask(title: string, userId: number, isFuture: boolean):Promise<Task>{
        const task = this.tasksRepository.create({
            title,
            user: {id: userId},
            isFuture: true,
        });
        return await this.tasksRepository.save(task);
    }
    async getTasksByUsers(userId: number):Promise<Task[]>{
        return this.tasksRepository.find({
            where: {user:{id: userId}}
        })
    }
}
