import {Body, Controller, Delete, Get, Param, Post,Patch} from '@nestjs/common';
import { TaskService } from './task.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entity/task.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {TaskDto} from "./dto/task.dto";
import {AppModule} from "../app.module";
import {isBoolean, IsNumber} from "class-validator";



@Controller('/api/tasks')
export class TaskController {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,

    ){}
    @Get()
    async getTasks(): Promise<Task[]>{
        return await this.tasksRepository.find();
    }
    @Post()
    async createTask(@Body() body : {title: string}): Promise<Task>  {
        const newTasks = this.tasksRepository.create({title: body.title, isFuture: true});
         return await this.tasksRepository.save(newTasks);
    }
    @Delete(':id')
    async deleteTask(@Param('id') id: number) : Promise<DeleteResult>  {
        return await this.tasksRepository.delete(id);
    }
    @Patch(':id')
    async updateTask(@Param('id') id: string){
     const task = await this.tasksRepository.findOneBy({id:parseInt(id) });
     if (task) {
         task.isFuture = !task.isFuture;
         await this.tasksRepository.save(task);
     }
     return {updated: false};
}
}
