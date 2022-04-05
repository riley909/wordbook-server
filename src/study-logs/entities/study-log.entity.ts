import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class StudyLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((_type) => User, (user) => user.studyLogs, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToMany((_type) => TestResult, (testResult) => testResult.studyLogs, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  testResults: TestResult[];

  @OneToMany((_type) => Comment, (comment) => comment.studyLog, { eager: true })
  comments: Comment[];
  @RelationId((studyLog: StudyLog) => studyLog.comments)
  commentIds: number[];
}
