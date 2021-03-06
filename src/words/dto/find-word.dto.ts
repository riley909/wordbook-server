import { IsOptional } from 'class-validator';

export class FindWordsDto {
  @IsOptional()
  folderId: number;

  @IsOptional()
  sort: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
