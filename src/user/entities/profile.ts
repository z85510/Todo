import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
