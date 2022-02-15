import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { FoldersService } from './folders.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoldersRepository]), AuthModule],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
