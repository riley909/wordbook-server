import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateStudyLogDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  testResultId: number[];
}
