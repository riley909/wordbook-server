import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';
import { WordsModule } from './words/words.module';
import { TestResultsModule } from './test-results/test-results.module';
import { StudyLogsModule } from './study-logs/study-logs.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    FoldersModule,
    AuthModule,
    WordsModule,
    TestResultsModule,
    StudyLogsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
