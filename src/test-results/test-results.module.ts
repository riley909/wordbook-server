import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TestResult } from './entities/test-result.entity';
import { TestResultsController } from './test-results.controller';
import { TestResultsService } from './test-results.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult]), AuthModule],
  controllers: [TestResultsController],
  providers: [TestResultsService],
})
export class TestResultsModule {}
