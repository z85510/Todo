import { Task } from '../entities/task';
import { RepeatOptions } from '../enums/repeate.enum';

export interface ITodo {
  id: number;

  title: string;

  description: string;

  done: boolean;

  deleted: boolean;

  updatedAt: Date;

  dueDate?: Date;

  reminderDate?: Date;

  repeat: boolean;

  repeatTime?: RepeatOptions;

  tasks?: Task[];
}
