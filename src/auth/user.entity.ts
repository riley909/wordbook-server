import { Folder } from 'src/folders/folder.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Word } from 'src/words/entities/word.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  level: number;

  @Column()
  exp: number;

  @Column()
  tree: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((_type) => Folder, (folder) => folder.user, { eager: true })
  folders: Folder[];

  @OneToMany((_type) => Word, (word) => word.user, { eager: true })
  words: Word[];

  @OneToMany((_type) => TestResult, (testResult) => testResult.user, {
    eager: true,
  })
  testResults: TestResult[];
}
