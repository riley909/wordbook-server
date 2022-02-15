import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FolderNameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;
}
