import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudyLogDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  testResultId: number[];
}
