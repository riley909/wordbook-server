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
import { CreateWordDto } from './dto/create-word.dto';
import { FindWordsDto } from './dto/find-word.dto';
import { WordsService } from './words.service';

@Controller('words')
@UseGuards(AuthGuard())
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Post()
  createWord(@Body() createWordDto: CreateWordDto, @GetUser() user: User) {
    return this.wordsService.createWord(createWordDto, user);
  }

  @Get()
  findWords(@Query() findWordsDto: FindWordsDto, @GetUser() user: User) {
    return this.wordsService.findWords(findWordsDto, user);
  }

  @Delete(':id')
  deleteWord(@Param('id') id: number, @GetUser() user: User) {
    return this.wordsService.deleteWord(id, user);
  }

  @Patch(':id')
  updateWordStatus(@Param('id') id: number, @GetUser() user: User) {
    return this.wordsService.updateWordStatus(id, user);
  }
}
