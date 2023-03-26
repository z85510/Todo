import { User } from '../../shared/entities/user';
import { RepeatOptions } from '../enums/repeate.enum';
export declare class TodoDto {
    title: string;
    description: string;
    done: boolean;
    deleted: boolean;
    repeat: boolean;
    user: User;
    repeatTime: RepeatOptions;
    dueDate: Date;
    reminderDate: Date;
}
