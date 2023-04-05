import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../shared/entities/user';
import { TodoDto } from '../dtos/todo.dto';
import { Todo } from '../entities/todo';
import { ITodo } from '../interfaces/todo.interface';
import { TodoService } from '../services/todo.service';

@Controller('todo')
@ApiTags('Todo')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [Todo] })
  async findAll(@CurrentUser() user: User) {
    return this.todoService.findAll(user);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new Todo' })
  @ApiResponse({
    status: 200,
    description: 'Create  userProfile',
    type: Todo,
  })
  async create(
    @Body() todo: TodoDto,
    @CurrentUser() user: User,
  ): Promise<ITodo> {
    const errors = await validate(todo);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    todo.user = user;
    return this.todoService.createTodo(todo);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find todo by id' })
  @ApiResponse({ status: 200, description: 'Return  todo', type: Todo })
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodoInfo(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update todo by id' })
  @ApiResponse({ status: 200, description: 'Return  todo', type: Todo })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: TodoDto,
  ) {
    return this.todoService.updateById(id, todo);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete todo' })
  @ApiResponse({
    status: 200,
    description: 'Delete  Todo',
  })
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
