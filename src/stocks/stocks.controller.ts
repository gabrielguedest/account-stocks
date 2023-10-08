import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
  ) {}

  @Get('/trends')
  async getTrendingStocks() {
    return await this.stocksService.getTrendingStocks();
  }
}
