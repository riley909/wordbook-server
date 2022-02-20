import { IsOptional, IsString } from 'class-validator';

export class UpdateStudyLogContentDto {
  @IsOptional()
  @IsString()
  content: string;
}
