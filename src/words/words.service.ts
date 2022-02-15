import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './entities/word.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {}

  async createWord(createWordDto: CreateWordDto, user: User) {
    const { target_code, folderId } = createWordDto;

    const existingWord = await this.wordsRepository.findOne({
      relations: ['folder'],
      where: {
        target_code,
        user,
        folder: folderId,
      },
    });

    if (existingWord) {
      throw new ConflictException(
        `word with target code "${target_code}" is already exists in folder with id "${folderId}"`,
      );
    }
    const word = await this.wordsRepository.create({
      target_code,
      status: 0,
      folder: { id: folderId },
      user,
    });

    await this.wordsRepository.save(word);
    return {
      message: `word with target code "${target_code}" is created`,
      word,
    };
  }
}
