import { IsNotEmpty } from 'class-validator';

export class SearchViewDto {
  @IsNotEmpty()
  target_code: string;
}
