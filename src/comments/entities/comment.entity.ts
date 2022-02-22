import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { StudyLog } from 'src/study-logs/entities/study-log.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  refComment: number;

  @ManyToOne((_type) => User, (user) => user.comments, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne((_type) => StudyLog, (studyLog) => studyLog.comments)
  studyLog: StudyLog;
}
