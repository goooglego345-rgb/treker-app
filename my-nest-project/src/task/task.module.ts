import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entity/task.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  JwtModule.register({ secret: 'vorona-gey'})],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
