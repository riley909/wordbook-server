import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { array: true })
  problems: number[];

  @Column('int', { array: true })
  wrongAnswers: number[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((_type) => User, (user) => user.testResults, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
