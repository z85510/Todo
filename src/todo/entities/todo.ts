import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../shared/entities/user';
import { RepeatOptions } from '../enums/repeate.enum';
import { Task } from './task';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, default: () => false })
  done: boolean;

  @Column({ nullable: true, default: () => false })
  deleted: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  reminderDate: Date;

  @Column({ nullable: true, default: () => false })
  repeat: boolean;

  @Column({
    type: 'enum',
    enum: RepeatOptions,
    default: RepeatOptions.NONE,
  })
  repeatTime: RepeatOptions;

  @OneToMany(() => Task, (task) => task.todo, { onDelete: 'CASCADE' })
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User;
}
