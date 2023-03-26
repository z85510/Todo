import { User } from '../../shared/entities/user';
import { RepeatOptions } from '../enums/repeate.enum';
import { Task } from './task';
export declare class Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    reminderDate: Date;
    repeat: boolean;
    repeatTime: RepeatOptions;
    tasks: Task[];
    user: User;
}
