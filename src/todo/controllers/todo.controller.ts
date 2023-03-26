import {
  BadRequestException,
  Body,
  Controller,
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
      throw new BadRequestException(errors); // throw a BadRequestException with the validation errors
    }
    todo.user = user;
    return this.todoService.createTodo(todo);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find todo by id' })
  @ApiResponse({ status: 200, description: 'Return  todo', type: Todo })
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findById(id);
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

  // @Get('user')
  // @ApiOperation({ summary: 'Get current user' })
  // @ApiResponse({ status: 200, description: 'Return  user', type: User })
  // getCurrent(@CurrentUser() user: any) {
  //   return this.userService.findById(user.id);
  // }

  // @Patch('user/update')
  // @ApiOperation({ summary: 'Update current user' })
  // @ApiResponse({ status: 200, description: 'Return  user', type: User })
  // updateUserById(@CurrentUser() user: any, @Body() userDetails: UpdateUserDto) {
  //   return this.userService.updateUserById(user.id, userDetails);
  // }

  // @Delete('user/delete')
  // @ApiOperation({ summary: 'Delete current user' })
  // @ApiResponse({ status: 200, description: 'Return  user', type: User })
  // deleteUser(@CurrentUser() user: any) {
  //   try {
  //     return this.userService.deleteUser(user.id);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // @Post('user/profile')
  // @ApiOperation({ summary: 'Update current user profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Update  userProfile',
  //   type: Profile,
  // })
  // createUserProfile(
  //   @CurrentUser() user: any,
  //   @Body() userProfileDetail: CreateUserProfileParams,
  // ) {
  //   return this.userService.createProfile(user.id, userProfileDetail);
  // }

  // @Get('profile')
  // @ApiOperation({ summary: 'Get current user profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Return  userProfile',
  //   type: Profile,
  // })
  // getUserProfile(@CurrentUser() user: any) {
  //   return this.userService.getUserProfile(user.id);
  // }
}
