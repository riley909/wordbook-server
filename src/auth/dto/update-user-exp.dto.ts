import { IsOptional } from 'class-validator';

export class UpdateUserExpDto {
  @IsOptional()
  exp: number;

  @IsOptional()
  level: number;

  @IsOptional()
  tree: string;
}
