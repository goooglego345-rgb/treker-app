import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./task.entity";



@Entity('time')
export class Time {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    targetTime: string;

    @Column({ default: false})
    isTriggers: boolean;

    @ManyToOne(() => Task, (task) => task.times, {onDelete: 'CASCADE'})
    task: Task;
}
