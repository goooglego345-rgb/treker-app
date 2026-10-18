import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entity/task.entity";
import {JwtModule} from "@nestjs/jwt";
import {TimeService} from "../time/time.service";
import {TimeController} from "../time/time.controller";
import {Time} from "./entity/time.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, Time]),
  JwtModule.register({ secret: 'vorona-gey'})],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
