import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FolderNameDto } from './dto/folder-name.dto';
import { Folder } from './folder.entity';

@EntityRepository(Folder)
export class FoldersRepository extends Repository<Folder> {
  async getFolders(user: User): Promise<Folder[]> {
    const query = this.createQueryBuilder('folder');
    query.where({ user });

    try {
      const folders = await query.getMany();
      return folders;
    } catch (error) {
      console.log(error.stack);
    }
  }

  async getFolderById(id: number, user: User): Promise<Folder> {
    const found = await this.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Folder with ID "${id}" not found`);
    }
    return found;
  }

  async createFolder(
    folderNameDto: FolderNameDto,
    user: User,
  ): Promise<Folder> {
    const { name } = folderNameDto;
    const existingFolder = await this.findOne({ name, user });

    if (existingFolder) {
      throw new ConflictException(`Folder name "${name}" already exists`);
    }

    const folder = this.create({
      name,
      user,
    });
    await this.save(folder);
    return folder;
  }

  async deleteFolder(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Folder with ID "${id}" not found`);
    }
  }

  async updateFolderName(
    id: number,
    folderNameDto: FolderNameDto,
    user: User,
  ): Promise<Folder> {
    const { name } = folderNameDto;
    const folder = await this.getFolderById(id, user);
    folder.name = name;
    await this.save(folder);
    return folder;
  }
}
