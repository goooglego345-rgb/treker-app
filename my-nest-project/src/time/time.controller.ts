import {Body, Controller, Post} from "@nestjs/common";
import {TimeService} from "./time.service";

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {
  }

@Post()
createTask(
    @Body('title') title: string,
@Body('targetTime') targetTime: string,

){
  return this.timeService.create(title,(targetTime))
}
}
