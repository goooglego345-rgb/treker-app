import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOptions, FindOptionsWhere, Repository} from 'typeorm';
import { Task } from './entity/task.entity';
import {ObservedValueOf} from "rxjs";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    findAllByUserId(userId: number) {
        // ШУКАЄМО ТІЛЬКИ ТІ ЗАДАЧІ, ДЕ userId ЗБІГАЄТЬСЯ
        return this.taskRepository.find({ where: { userId } });
    }

    create(title: string, userId: number) {
        // ПРИВ'ЯЗУЄМО ЗАДАЧУ ДО ЮЗЕРА ПРИ СТВОРЕННІ
        const newTask = this.taskRepository.create({ title, userId });
        return this.taskRepository.save(newTask);
    }

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