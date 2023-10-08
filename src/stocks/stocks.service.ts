import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService {
  constructor(
    private readonly stocksRepository: StocksRepository,
  ) {}

  async getTrendingStocks() {
    const stocks = await this.stocksRepository.findTrendingStocks();
    
    return stocks.map(stock => ({
      symbol: stock.symbol,
      currentPrice: stock.price,
    }));
  }
}
