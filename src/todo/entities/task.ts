import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todo';

@Entity({ name: 'task' })
export class Task {
  @ApiProperty({ type: 'number', format: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'title', description: 'Task title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'description', description: 'Task description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  done: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  deleted: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ type: () => Todo })
  @ManyToOne(() => Todo, (todo) => todo.tasks, { onDelete: 'CASCADE' })
  todo: Todo;
}
