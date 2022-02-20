import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { TestResultsService } from 'src/test-results/test-results.service';
import { In, Repository } from 'typeorm';
import { CreateStudyLogDto } from './dto/create-study-log.dto';
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
    const testResults = await this.testResultsRepository.find({
      where: { id: In(testResultId) },
    });

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
}
