import { IsString } from 'class-validator';

export type CreateUserParams = {
  username: string;
  password: string;
  refreshToken?: string;
};

export type UpdateUserParams = {
  username?: string;
  password?: string;
  refreshToken?: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  email?: string;
  birthDate?: Date;
};

export type UpdateUserProfileParams = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
