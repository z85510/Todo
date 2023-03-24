import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: 'number', format: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'title', description: 'Todo title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'description', description: 'Todo description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, default: () => false })
  done: boolean;

  @ApiProperty()
  @Column({ nullable: true, default: () => false })
  deleted: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ nullable: true })
  dueDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  reminderDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ nullable: true, default: () => false })
  repeat: boolean;

  @ApiProperty({
    enum: RepeatOptions,
    default: RepeatOptions.NONE,
    example: RepeatOptions.DAILY,
  })
  @Column({
    type: 'enum',
    enum: RepeatOptions,
    default: RepeatOptions.NONE,
  })
  repeatTime: RepeatOptions;

  @ApiProperty({ type: () => Task, format: 'table' })
  @OneToMany(() => Task, (task) => task.todo)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
