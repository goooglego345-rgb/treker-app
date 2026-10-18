import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {isBoolean} from "class-validator";
import {Time} from "./time.entity";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    date: Date;

    @Column({default: false})
    isFuture: boolean;

   @ManyToOne(() => User, (user) => user.task,{onDelete: 'CASCADE'})
    user:User;

   @OneToMany(() => Time, (time) => time.task)
   times: Time[];

   @Column()
   userId: number;

}