import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchViewDto } from './dto/search-view.dto';
import { SearchDto } from './dto/search.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/search')
  async search(@Query() searchDto: SearchDto) {
    return this.appService.search(searchDto);
  }

  @Get('/searchView')
  async searchView(@Query() searchViewDto: SearchViewDto) {
    return this.appService.searchView(searchViewDto);
  }
}
