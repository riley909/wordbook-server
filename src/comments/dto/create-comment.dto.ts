import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  refComment: number;

  @IsNotEmpty()
  studyLogId: number;
}
