import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { validate } from 'class-validator';
import { TaskDto } from '../dtos/task.dto';
import { Task } from '../entities/task';
import { ITask } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';
import { TodoService } from '../services/todo.service';

@Controller('task')
@ApiTags('Task')
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly todoService: TodoService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new task for a todo item' })
  @ApiResponse({
    status: 200,
    description: 'Create new task for a todo item',
    type: Task,
  })
  async createTask(
    @Body() taskDto: TaskDto,
    @Body('todoId', ParseIntPipe) todoId: number,
  ): Promise<ITask> {
    const todo = await this.todoService.findById(todoId);
    if (!todo) {
      throw new NotFoundException(`Todo item with id ${todoId} not found`);
    }

    const errors = await validate(taskDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.taskService.createTask(taskDto, todo);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({ status: 200, description: 'Return  task', type: Task })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: TaskDto,
  ) {
    return this.taskService.updateById(id, task);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Task' })
  @ApiResponse({
    description: 'Delete  Task',
  })
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
