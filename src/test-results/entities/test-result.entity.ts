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

  @Column()
  totalNum: number;

  @Column()
  passNum: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  wrongAnswers: string;

  @ManyToOne((_type) => User, (user) => user.testResults, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
