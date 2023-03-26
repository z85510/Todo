import { Todo } from './todo';
export declare class Task {
    id: number;
    title: string;
    description: string;
    done: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    todo: Todo;
}
