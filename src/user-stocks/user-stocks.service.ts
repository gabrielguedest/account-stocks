import { Injectable } from '@nestjs/common';
import { UserStocksRepository } from './user-stocks.repository';

@Injectable()
export class UserStocksService {
  constructor(
    private readonly userStocksRepository: UserStocksRepository,
  ) {}

  async getUserStocks(userId: string) {
    const userStocks = await this.userStocksRepository.findAllUserStocks(userId);

    return {
      stocks: userStocks.map(userStock => ({
        symbol: userStock.stock.symbol,
        amount: userStock.amount,
        currentPrice: userStock.stock.price,
      })),
      total: userStocks.reduce((acc, userStock) => {
        return acc + (userStock.amount * userStock.stock.price);
      }, 0),
    }
  }
}
