import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateTestResultDto {
  @IsNotEmpty()
  @IsArray()
  problems: number[];

  @IsNotEmpty()
  @IsArray()
  wrongAnswers: number[];
}
