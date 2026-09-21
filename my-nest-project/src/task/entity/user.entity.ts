import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./task.entity";


@Entity('auth')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[]

    register(username: string, password: string): Promise<Awaited<undefined>> {
        return Promise.resolve(undefined);
    }
}