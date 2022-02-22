import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { In, Repository } from 'typeorm';
import { CreateStudyLogDto } from './dto/create-study-log.dto';
import { GetStudyLogsDto } from './dto/get-study-logs.dto';
import { UpdateStudyLogDto } from './dto/update-study-log.dto';
import { StudyLog } from './entities/study-log.entity';

@Injectable()
export class StudyLogsService {
  constructor(
    @InjectRepository(StudyLog)
    private studyLogsRepository: Repository<StudyLog>,
    @InjectRepository(TestResult)
    private testResultsRepository: Repository<TestResult>,
  ) {}

  async createStudyLog(createStudyLogDto: CreateStudyLogDto, user: User) {
    const { content, testResultId } = createStudyLogDto;

    let testResults;
    if (testResultId) {
      testResults = await this.testResultsRepository.find({
        where: { id: In(testResultId) },
      });
    } else {
      testResults = null;
    }

    const studyLog = await this.studyLogsRepository.create({
      content,
      user,
      testResults,
    });
    const result = await this.studyLogsRepository.save(studyLog);

    return {
      message: `Study log with id "${result.id}" is created`,
      studyLog,
    };
  }

  async getStudyLogs(getStudyLogsDto: GetStudyLogsDto, user: User) {
    // eslint-disable-next-line prefer-const
    let { limit, offset, search, date } = getStudyLogsDto;
    limit = limit || 10;
    offset = offset || 1;

    const query = await this.studyLogsRepository.createQueryBuilder(
      'study-log',
    );
    query.where({ user });

    if (search) {
      query.andWhere('study-log.content ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (date) {
      query.andWhere('Date(study-log.createdAt) = :date', {
        date: date,
      });
    }

    query.take(limit).skip(limit * (offset - 1));

    try {
      const total = await query.getCount();
      const studyLogs = await query.getMany();
      return {
        total: total,
        limit: limit,
        currentPage: offset,
        data: studyLogs,
      };
    } catch (error) {
      console.log(error.stack);
    }
  }

  async getStudyLogById(id: number, user: User) {
    const studyLog = await this.studyLogsRepository.findOne({ id, user });
    if (!studyLog) {
      throw new NotFoundException(`Study log with id "${id}" not found`);
    }
    return studyLog;
  }

  async updateStudyLog(
    id: number,
    updateStudyLogDto: UpdateStudyLogDto,
    user: User,
  ) {
    const { content, testResultId } = updateStudyLogDto;

    const studyLog = await this.studyLogsRepository.findOne({ id, user });
    const testResults = await this.testResultsRepository.find({
      where: { id: In(testResultId) },
    });

    studyLog.content = content;
    studyLog.testResults = testResults;

    await this.studyLogsRepository.save(studyLog);

    return {
      message: `Study log content with id "${id}" is updated`,
      studyLog,
    };
  }

  async deleteStudyLog(id: number, user: User) {
    const result = await this.studyLogsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Study log with id "${id}" not found`);
    }
    return {
      message: `Study log with id "${id}" is deleted`,
    };
  }
}
