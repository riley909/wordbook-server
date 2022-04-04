import { IsOptional } from 'class-validator';

export class GetFoldersDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
