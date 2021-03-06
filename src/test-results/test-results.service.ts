import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { TestResult } from './entities/test-result.entity';

@Injectable()
export class TestResultsService {
  constructor(
    @InjectRepository(TestResult)
    private testResultsRepository: Repository<TestResult>,
  ) {}

  async createTestResult(createTestResultDto: CreateTestResultDto, user: User) {
    const { problems, wrongAnswers } = createTestResultDto;
    const testResult = await this.testResultsRepository.create({
      problems,
      wrongAnswers,
      user,
    });

    const result = await this.testResultsRepository.save(testResult);
    return {
      message: `testResult with id "${result.id}" is created`,
      testResult,
    };
  }

  async getTestResults(user: User) {
    const testResults = await this.testResultsRepository.find({ user });
    return testResults;
  }

  async getTestResultById(id: number, user: User) {
    const testResult = await this.testResultsRepository.findOne({ id, user });
    if (!testResult) {
      throw new NotFoundException(`Test result with id "${id}" not found`);
    }
    return testResult;
  }

  async deleteTestResult(id: number, user: User) {
    const result = await this.testResultsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Test result with id "${id}" not found`);
    }
    return {
      message: `Test result with id "${id}" is deleted`,
    };
  }
}
