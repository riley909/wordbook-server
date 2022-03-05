import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  // 검색 시작 번호(기본값 1)
  @IsOptional()
  start: number;

  // 결과 출력 건수(기본값 10)
  @IsOptional()
  num: number;

  // 검색 대상(기본값 word)
  // word, ip(관용구,속담), dfn(뜻풀이), exam
  @IsOptional()
  @IsString()
  part: string;

  @IsNotEmpty()
  @IsString()
  q: string;

  // 정렬방식(기본값 dict)
  // dict(사전 순), popular(많이 찾은 순)
  @IsOptional()
  @IsString()
  sort: string;
}
