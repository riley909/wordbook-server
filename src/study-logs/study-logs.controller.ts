import {
  Body,
  Controller,
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
import { CreateStudyLogDto } from './dto/create-study-log.dto';
import { GetStudyLogsDto } from './dto/get-study-logs.dto';
import { UpdateStudyLogContentDto } from './dto/update-study-log-content.dto';
import { StudyLogsService } from './study-logs.service';

@Controller('study-logs')
@UseGuards(AuthGuard())
export class StudyLogsController {
  constructor(private studyLogsService: StudyLogsService) {}

  @Post()
  createStudyLog(
    @Body() createStudyLogDto: CreateStudyLogDto,
    @GetUser() user: User,
  ) {
    return this.studyLogsService.createStudyLog(createStudyLogDto, user);
  }

  @Get()
  getStudyLogs(
    @Query() getStudyLogsDto: GetStudyLogsDto,
    @GetUser() user: User,
  ) {
    return this.studyLogsService.getStudyLogs(getStudyLogsDto, user);
  }

  @Get(':id')
  getStudyLogById(@Param('id') id: number, @GetUser() user: User) {
    return this.studyLogsService.getStudyLogById(id, user);
  }

  @Patch(':id/content')
  updateStudyLogContent(
    @Param('id') id: number,
    @Body() updateStudyLogContent: UpdateStudyLogContentDto,
    @GetUser() user: User,
  ) {
    return this.studyLogsService.updateStudyLogContent(
      id,
      updateStudyLogContent,
      user,
    );
  }
}
