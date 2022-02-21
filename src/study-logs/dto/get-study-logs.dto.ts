import { IsOptional, IsString } from 'class-validator';

export class GetStudyLogsDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  date: Date;
}
