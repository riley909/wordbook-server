import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StudyLog } from './entities/study-log.entity';
import { StudyLogsController } from './study-logs.controller';
import { StudyLogsService } from './study-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudyLog]), AuthModule],
  controllers: [StudyLogsController],
  providers: [StudyLogsService],
})
export class StudyLogsModule {}
