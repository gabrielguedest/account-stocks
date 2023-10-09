import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserStocksRepository } from './user-stocks.repository';
import { CheckingAccountService } from 'src/checking-account/services/checking-account.service';
import { UserService } from 'src/user/services/user.service';
import { DatabaseService } from 'src/database/database.service';
import { StocksService } from 'src/stocks/stocks.service';

@Injectable()
export class UserStocksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly checkingAccountService: CheckingAccountService,
    private readonly userService: UserService,
    private readonly userStocksRepository: UserStocksRepository,
    private readonly stocksService: StocksService,
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

  async buyStocks(cpf: string, stockSymbol: string, amount: number) {
    const user = await this.userService.getUserByCpf(cpf);
    if (!user) {
      throw new UnauthorizedException();
    }

    const stock = await this.stocksService.getStockBySymbol(stockSymbol);
    const transaction = await this.databaseService.transaction();

    try {
      await this.checkingAccountService.withdraw(user.checkingAccount, stock.price * amount, transaction);
      const userStock = await this.userStocksRepository.findUserStock(user.id, stock.id, transaction);

      if (userStock) {
        await this.userStocksRepository.updateStockAmount(userStock.id, userStock.amount + amount, transaction)
      } else {
        await this.userStocksRepository.createUserStock(user.id, stock.id, amount, transaction);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
