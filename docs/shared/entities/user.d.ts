import { Todo } from '../../todo/entities/todo';
import { Profile } from '../../user/entities/profile';
export declare class User {
    id: number;
    username: string;
    password: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
    todos: Todo[];
}
