import { User } from '../../shared/entities/user';
import { TodoDto } from '../dtos/todo.dto';
import { ITodo } from '../interfaces/todo.interface';
import { TodoService } from '../services/todo.service';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(user: User): Promise<ITodo[]>;
    create(todo: TodoDto, user: User): Promise<ITodo>;
    findUser(id: number): Promise<ITodo>;
    updateById(id: number, todo: TodoDto): Promise<ITodo>;
}
