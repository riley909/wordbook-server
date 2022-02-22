import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(28)
  password: string;
}
