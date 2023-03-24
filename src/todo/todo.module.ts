import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { Task } from './entities/task';
import { Todo } from './entities/todo';
import { TodoService } from './services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Task])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
