import { Profile } from '../entities/profile';

export interface IUser {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile;
}
