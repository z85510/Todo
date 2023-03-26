import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../shared/entities/user';
import { CreateProfileDto } from '../dtos/create_profile.dto';
import { UpdateUserDto } from '../dtos/update_user.dto';
import { Profile } from '../entities/profile';
import { UsersService } from '../services/users.service';

@Controller()
@ApiTags('User')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('user/all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  findUsers() {
    return this.userService.findAllUsers();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ status: 200, description: 'Return  user', type: User })
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Return  user', type: User })
  getCurrent(@CurrentUser() user: any) {
    return this.userService.findById(user.id);
  }

  @Patch('user/update')
  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({ status: 200, description: 'Return  user', type: User })
  @UsePipes(ValidationPipe)
  updateUserById(@CurrentUser() user: any, @Body() userDetails: UpdateUserDto) {
    return this.userService.updateUserById(user.id, userDetails);
  }

  @Delete('user/delete')
  @ApiOperation({ summary: 'Delete current user' })
  @ApiResponse({ status: 200, description: 'Return  user', type: User })
  deleteUser(@CurrentUser() user: any) {
    try {
      return this.userService.deleteUser(user.id);
    } catch (err) {
      throw err;
    }
  }

  @Post('profile')
  @ApiOperation({ summary: 'create current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Create User Profile',
    type: Profile,
  })
  @UsePipes(ValidationPipe)
  createUserProfile(
    @CurrentUser() user: any,
    @Body() userProfileDetail: CreateProfileDto,
  ) {
    return this.userService.createProfile(user.id, userProfileDetail);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Return  User Profile',
    type: Profile,
  })
  getUserProfile(@CurrentUser() user: any) {
    return this.userService.getUserProfile(user.id);
  }
}
