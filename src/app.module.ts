import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';
import { WordsModule } from './words/words.module';

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
  ],
})
export class AppModule {}
