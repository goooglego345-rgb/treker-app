import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, FindOptions, FindOptionsWhere, Repository} from 'typeorm';
import { Task } from './entity/task.entity';

import {ObservedValueOf} from "rxjs";
import {getRawAsset} from "node:sea";
import {Time} from "./entity/time.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Time)
        private timeRepository: Repository<Time>,
    ) {}

    findAllByUserId(userId: number) {
        // ШУКАЄМО ТІЛЬКИ ТІ ЗАДАЧІ, ДЕ userId ЗБІГАЄТЬСЯ
        return this.taskRepository.find({ where: { userId } });
    }

    async create(title: string, userId: number, targetTime: string) {
        const newTask = this.taskRepository.create({ title, userId });
        const savedTask = await this.taskRepository.save(newTask)
        if(targetTime && targetTime.trim()!= ''){
            const newTime =  this.timeRepository.create({
                title:title,
                targetTime:targetTime,
                task: savedTask
            });
             await this.timeRepository.save(newTime);
        }
        return savedTask;
    };


    async delete(id: number, userId: number) {
        // ВИДАЛИТЬ ТІЛЬКИ ЯКЩО ЗБІГАЄТЬСЯ І ID ЗАДАЧІ І ID ЮЗЕРА
        const result = await this.taskRepository.delete({ id, userId });
        if (result.affected === 0) {
            throw new NotFoundException('Задачу не знайдено (або це чужа задача)');
        }
    }

    async toggle(id: number, userId: number) {
        const task = await this.taskRepository.findOne({ where: { id, userId} });

        if (!task) {
            throw new NotFoundException('Задачу не знайдено (або це чужа задача)');
        }
        return this.taskRepository.save(task);
    }
}