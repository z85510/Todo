import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user';
import { TodoDto } from '../dtos/todo.dto';
import { Task } from '../entities/task';
import { Todo } from '../entities/todo';
import { ITodo } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(user: User): Promise<ITodo[]> {
    return this.todoRepository.find({
      where: { user },
    });
  }

  async findById(todoId: number): Promise<ITodo | undefined> {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
      relations: ['tasks'],
    });
    if (!todo || todoId == undefined || !todoId) {
      throw new NotFoundException(`Todo with id ${todoId} not found`);
    }
    const todoItem: ITodo = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done,
      deleted: todo.deleted,
      updatedAt: todo.updatedAt,
      dueDate: todo.dueDate,
      reminderDate: todo.reminderDate,
      repeat: todo.repeat,
      repeatTime: todo.repeatTime,
      tasks: todo.tasks,
    };

    return todoItem;
  }

  async createTodo(todoDetail: TodoDto): Promise<ITodo | undefined> {
    try {
      const newTodo = this.todoRepository.create({
        ...todoDetail,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const createdTodo: Todo = await this.todoRepository.save(newTodo);

      const todoItem: ITodo = {
        id: createdTodo.id,
        title: createdTodo.title,
        description: createdTodo.description,
        done: createdTodo.done,
        deleted: createdTodo.deleted,
        updatedAt: createdTodo.updatedAt,
        dueDate: createdTodo.dueDate,
        reminderDate: createdTodo.reminderDate,
        repeat: createdTodo.repeat,
        repeatTime: createdTodo.repeatTime,
      };
      return todoItem;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(todoId: number, todoDetails: TodoDto) {
    const todo = await this.findById(todoId);

    const updatedUser = await this.todoRepository.save({
      ...todo,
      ...todoDetails,
      updatedAt: new Date(),
    });

    const todoItem: ITodo = {
      id: updatedUser.id,
      title: updatedUser.title,
      description: updatedUser.description,
      done: updatedUser.done,
      deleted: updatedUser.deleted,
      updatedAt: updatedUser.updatedAt,
      dueDate: updatedUser.dueDate,
      reminderDate: updatedUser.reminderDate,
      repeat: updatedUser.repeat,
      repeatTime: updatedUser.repeatTime,
    };
    return todoItem;
  }
}
