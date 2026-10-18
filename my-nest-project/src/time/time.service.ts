import {Inject, Injectable, Logger} from "@nestjs/common";
import {TaskService} from "../task/task.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Time} from "../task/entity/time.entity";
import {Repository} from "typeorm";
import {Cron, CronExpression} from "@nestjs/schedule";


@Injectable()
export class TimeService {
    private readonly logger = new Logger(TimeService.name);

    constructor(
        @InjectRepository(Time)
        private timeRepository : Repository<Time>,
    ) {}
    create(title: string, targetTime: string) {
        const newTime = this.timeRepository.create({title, targetTime});
        return this.timeRepository.save(newTime);
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async checkTasks(){
        this.logger.log("Timer worked");
        const now = new Date();
        const currentHours = now.getHours().toString().padStart(2, "0");
        const currentMinutes = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${currentHours}:${currentMinutes}`;
        const  tasksToTrigger = await this.timeRepository.find({
            where: {
                targetTime: currentTime,
                isTriggers: false
            }
        });
        for(const time of tasksToTrigger){
            this.logger.warn(`Vorona pididi because: ${time.title}`)
            time.isTriggers = true;
            await this.timeRepository.save(time)
    }
}

}
