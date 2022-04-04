import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Word } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((_type) => User, (user) => user.folders, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany((_type) => Word, (word) => word.folder, { eager: true })
  words: Word[];
}
