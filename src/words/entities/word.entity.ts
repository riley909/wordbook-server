import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Folder } from 'src/folders/folder.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  target_code: number;

  @Column()
  status: number;

  @ManyToOne((_type) => User, (user) => user.words, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne((_type) => Folder, (folder) => folder.words, { eager: false })
  folder: Folder;
  @RelationId((word: Word) => word.folder)
  folderId: number;
}
