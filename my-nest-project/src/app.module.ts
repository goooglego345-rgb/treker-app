import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {TaskController} from "./task/task.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task/entity/task.entity";
import {AuthModule, jwtConstants} from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";
import {User} from "./task/entity/user.entity";
import {AuthService} from "./auth/auth.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'postgres',
        entities: [Task, User],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Task]),
      AuthModule,
      TaskModule,
      JwtModule.register({
          global: true,
          secret: 'vorona-gey',
          signOptions: { expiresIn: '1d' },
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
