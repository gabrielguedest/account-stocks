import { Injectable, Inject } from '@nestjs/common';
import { Stock } from './stock.entity';
import { Constants } from '../constants';

@Injectable()
export class StocksRepository {
  constructor(
    @Inject(Constants.StocksRepository)
    private readonly repository: typeof Stock,
  ) {}

  async findTrendingStocks() {
    return await this.repository.findAll({
      limit: 5,
    });
  }

  async findStockBySymbol(symbol: string) {
    return await this.repository.findOne({
      where: {
        symbol,
      },
    });
  }
}
