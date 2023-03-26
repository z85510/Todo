import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user';
import { TodoDto } from '../dtos/todo.dto';
import { Task } from '../entities/task';
import { Todo } from '../entities/todo';
import { ITodo } from '../interfaces/todo.interface';
export declare class TodoService {
    private todoRepository;
    private taskRepository;
    constructor(todoRepository: Repository<Todo>, taskRepository: Repository<Task>);
    findAll(user: User): Promise<ITodo[]>;
    findById(todoId: number): Promise<ITodo | undefined>;
    createTodo(todoDetail: TodoDto): Promise<ITodo | undefined>;
    updateById(todoId: number, todoDetails: TodoDto): Promise<ITodo>;
}
