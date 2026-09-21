import {Body, Controller, Get, Inject, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "../task/entity/user.entity";

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.username, body.password,body.task);
  }
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.singIn(body.username, body.password);
  }
  @Post('createTask')
  async createTask(@Body('title') title: string,@Req() req:any,isFuture:boolean )
  {
    const userId = req.user.sub;
    return this.authService.createTask(title, userId,isFuture);
  }
  @Get()
  async getMyTask(@Req() req:any){
    const userId = req.user.sub;
    return this.authService.getTasksByUsers(userId);
  }
}
