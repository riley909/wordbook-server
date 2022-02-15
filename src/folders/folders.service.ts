import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FolderNameDto } from './dto/folder-name.dto';
import { Folder } from './folder.entity';
import { FoldersRepository } from './folders.repository';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(FoldersRepository)
    private foldersRepository: FoldersRepository,
  ) {}

  getFolders(user: User): Promise<Folder[]> {
    return this.foldersRepository.getFolders(user);
  }

  getFolderById(id: number, user: User): Promise<Folder> {
    return this.foldersRepository.getFolderById(id, user);
  }

  createFolder(folderNameDto: FolderNameDto, user: User): Promise<Folder> {
    return this.foldersRepository.createFolder(folderNameDto, user);
  }

  deleteFolder(id: number, user: User): Promise<void> {
    return this.foldersRepository.deleteFolder(id, user);
  }

  updateFolderName(id: number, folderNameDto: FolderNameDto, user: User) {
    return this.foldersRepository.updateFolderName(id, folderNameDto, user);
  }
}
