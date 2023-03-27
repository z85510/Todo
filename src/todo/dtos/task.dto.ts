import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: 'title', description: 'Task title' })
  title: string;

  @ApiProperty({ example: 'description', description: 'Task description' })
  description: string;

  @ApiProperty({ example: 'done', description: 'check if task is done' })
  done: boolean;

  @ApiProperty({ example: 'deleted', description: 'check if task is deleted' })
  deleted: boolean;
}
