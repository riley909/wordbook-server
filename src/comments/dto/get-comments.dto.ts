import { IsOptional } from 'class-validator';

export class GetCommentsDto {
  @IsOptional()
  studyLogId: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
