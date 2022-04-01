import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FolderNameDto } from './dto/folder-name.dto';
import { GetFoldersDto } from './dto/get-folders-dto';
import { Folder } from './folder.entity';
import { FoldersService } from './folders.service';

@Controller('folders')
@UseGuards(AuthGuard())
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Get()
  getFolders(@Query() getFoldersDto: GetFoldersDto, @GetUser() user: User) {
    return this.foldersService.getFolders(getFoldersDto, user);
  }

  @Get('/:id')
  getFolderById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Folder> {
    return this.foldersService.getFolderById(id, user);
  }

  @Post()
  createFolder(
    @Body() folderNameDto: FolderNameDto,
    @GetUser() user: User,
  ): Promise<Folder> {
    return this.foldersService.createFolder(folderNameDto, user);
  }

  @Delete('/:id')
  deleteFolder(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.foldersService.deleteFolder(id, user);
  }

  @Patch('/:id')
  updateFolderName(
    @Param('id') id: number,
    @Body() folderNameDto: FolderNameDto,
    @GetUser() user: User,
  ): Promise<Folder> {
    return this.foldersService.updateFolderName(id, folderNameDto, user);
  }
}
