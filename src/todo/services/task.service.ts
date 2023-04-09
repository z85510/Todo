import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from '../dtos/task.dto';
import { Task } from '../entities/task';
import { Todo } from '../entities/todo';
import { ITask } from '../interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(todo: Todo): Promise<ITask[]> {
    return this.taskRepository.find({
      where: { todo },
    });
  }

  async findById(taskId: number): Promise<Task | undefined> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });
    if (!task || taskId == undefined || !taskId) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return task;
  }

  async createTask(
    taskDetail: TaskDto,
    todo: Todo,
  ): Promise<ITask | undefined> {
    try {
      const newTask = await this.taskRepository.save({
        ...taskDetail,
        createdAt: new Date(),
        updatedAt: new Date(),
        todo: todo,
      });
      return newTask;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(taskId: number, taskDetail: TaskDto) {
    const task = await this.findById(taskId);
    const updatedTask = await this.taskRepository.save({
      ...task,
      ...taskDetail,
      updatedAt: new Date(),
    });
    return {
      ...updatedTask,
      updatedAt: updatedTask.updatedAt.toISOString(),
    };
  }

  async deleteTask(taskId: number) {
    const task: Task = await this.findById(taskId);
    if (!task || taskId == undefined || !taskId) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return this.taskRepository.remove(task);
  }
}
