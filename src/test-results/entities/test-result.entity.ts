import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { StudyLog } from 'src/study-logs/entities/study-log.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @ManyToMany((_type) => StudyLog, (studyLog) => studyLog.testResults, {
    nullable: true,
  })
  studyLogs: StudyLog[];
}
