import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: true})
    isFuture: boolean;
}