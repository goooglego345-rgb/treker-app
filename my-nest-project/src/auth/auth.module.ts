import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../task/entity/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {Task} from "../task/entity/task.entity";
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
      TypeOrmModule.forFeature([User, Task])],

})
export class AuthModule {}
export const jwtConstants = {
  secret: 'vorona-gey'
}