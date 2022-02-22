import { IsOptional } from 'class-validator';

export class UpdateUserExpDto {
  @IsOptional()
  exp: number;

  @IsOptional()
  tree: string;
}
