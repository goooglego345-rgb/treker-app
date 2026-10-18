import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import {TimeService} from "../time/time.service";

@UseGuards(AuthGuard) // ЗАХИЩАЄМО ВСІ МАРШРУТИ ЗАДАЧ
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get()
    getAllTasks(@Request() req) {
        // req.user.sub - це ID юзера, який зараз користується додатком
        return this.taskService.findAllByUserId(req.user.sub);
    }

    @Post()
    createTask(@Body('title') title: string,
               @Body('targetTime') targetTime: string, // <-- 1. ДОДАЙ витягування часу з JSON
               @Request() req) {
        return this.taskService.create(title, req.user.sub,targetTime);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string, @Request() req) {
        return this.taskService.delete(Number(id), req.user.sub);
    }

    @Patch(':id/toggle')
    toggleTask(@Param('id') id: string, isFuture: boolean, @Request() req) {
        return this.taskService.toggle(Number(id), req.user.sub);
    }
}