import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: true})
    isFuture: boolean;

   @ManyToOne(() => User, (user) => user.task,{onDelete: 'CASCADE'})
    user:User;

   @Column()
   userId: number;
}