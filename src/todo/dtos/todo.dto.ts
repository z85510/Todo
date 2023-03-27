import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../shared/entities/user';
import { RepeatOptions } from '../enums/repeate.enum';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'title', description: 'Todo title' })
  title: string;

  @IsOptional()
  @ApiProperty({ example: 'description', description: 'Todo description' })
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', format: 'true,false', default: false })
  done: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', format: 'true,false', default: false })
  deleted: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', format: 'true,false', default: false })
  repeat: boolean;

  @ApiProperty({ type: User, format: 'user' })
  user: User;

  @IsOptional()
  @IsEnum(RepeatOptions)
  @ApiProperty({ enum: RepeatOptions, example: RepeatOptions.DAILY })
  repeatTime: RepeatOptions;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: 'string', format: 'date-time' })
  dueDate: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: 'string', format: 'date-time' })
  reminderDate: Date;
}
