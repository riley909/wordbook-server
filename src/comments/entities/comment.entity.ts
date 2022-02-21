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

  @Column('int', { array: true, nullable: true })
  refComment: number[];

  @ManyToOne((_type) => User, (user) => user.comments)
  user: User;

  @ManyToOne((_type) => StudyLog, (studyLog) => studyLog.comments)
  studyLog: StudyLog;
}
