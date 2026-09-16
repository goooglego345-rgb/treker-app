import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {TaskController} from "./task/task.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task/entity/task.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'postgres',
        entities: [Task],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
