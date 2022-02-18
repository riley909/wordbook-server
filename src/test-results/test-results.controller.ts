import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { TestResultsService } from './test-results.service';

@Controller('test-results')
@UseGuards(AuthGuard())
export class TestResultsController {
  constructor(private testResultsService: TestResultsService) {}

  @Post()
  createTestResult(
    @Body() createTestResultDto: CreateTestResultDto,
    @GetUser() user: User,
  ) {
    return this.testResultsService.createTestResult(createTestResultDto, user);
  }

  @Get()
  getTestResults(@GetUser() user: User) {
    return this.testResultsService.getTestResults(user);
  }

  @Get(':id')
  getTestResultById(@Param('id') id: number, @GetUser() user: User) {
    return this.testResultsService.getTestResultById(id, user);
  }
}
