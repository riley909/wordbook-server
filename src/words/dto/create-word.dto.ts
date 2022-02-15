import { IsNotEmpty } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  target_code: number;

  @IsNotEmpty()
  folderId: number;
}
