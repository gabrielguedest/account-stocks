import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getStockBySymbol(symbol: string) {
    const stock = await this.stocksRepository.findStockBySymbol(symbol);

    if (!stock) {
      throw new NotFoundException('Ação não encontrada');
    }

    return {
      id: stock.id,
      symbol: stock.symbol,
      price: stock.price,
    };
  }
}
