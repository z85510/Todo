import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { Task } from './entities/task';
import { Todo } from './entities/todo';
import { TodoService } from './services/todo.service';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Task])],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService],
  exports: [TodoService, TaskService],
})
export class TodoModule {}
