import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: 'string', format: 'string' })
  username: string;
  @ApiProperty({ type: 'string', format: 'string' })
  password: string;
}
