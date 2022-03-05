import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './search.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/search')
  async search(@Query() searchDto: SearchDto) {
    return this.appService.search(searchDto);
  }
}
