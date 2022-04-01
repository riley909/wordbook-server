import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { FindWordsDto } from './dto/find-word.dto';
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

  async findWords(findWordsDto: FindWordsDto, user: User) {
    let { folderId, sort, limit, offset } = findWordsDto;
    folderId = folderId;
    sort = sort || 'DESC';
    limit = limit || 10;
    offset = offset || 1;

    const query = this.wordsRepository.createQueryBuilder('word');
    query.where({ user });

    if (folderId) {
      query.andWhere('word.folderId = :folderId', { folderId });
    }

    if (sort === 'DESC') query.orderBy('word.createdAt', 'DESC');
    if (sort === 'ASC') query.orderBy('word.createdAt', 'ASC');

    if (limit && offset) query.take(limit).skip(limit * (offset - 1));

    try {
      const words = await query.getMany();
      return words;
    } catch (error) {
      console.log(error.stack);
    }
  }

  async deleteWord(id: number, user: User) {
    const result = await this.wordsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`word with id "${id}" not found`);
    }
    return {
      message: `word with id "${id}" is deleted`,
    };
  }

  async updateWordStatus(id: number, user: User) {
    const word = await this.wordsRepository.findOne({ id, user });

    if (word) {
      if (word.status === 0) word.status = 1;
      else word.status = 0;
      await this.wordsRepository.save(word);
      return {
        message: `word with id "${id}" status updated`,
        word,
      };
    } else {
      throw new NotFoundException(`word with id "${id}" not found`);
    }
  }
}
