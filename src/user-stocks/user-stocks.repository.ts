import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../utils/constants';
import { UserStock } from './user-stock.entity';
import { Stock } from '../stocks/stock.entity';
import { Transaction } from '../database/transaction';

@Injectable()
export class UserStocksRepository {
  constructor(
    @Inject(Constants.UserStocksRepository)
    private readonly repository: typeof UserStock,
  ) {}

  async findAllUserStocks(userId: string) {
    return await this.repository.findAll({
      where: {
        userId,
      },
      include: [Stock],
    });
  }

  async findUserStock(
    userId: string,
    stockId: string,
    transaction?: Transaction,
  ) {
    return await this.repository.findOne({
      where: {
        userId,
        stockId,
      },
      transaction: transaction?.raw,
    });
  }

  async updateStockAmount(
    userStockId: string,
    newAmount: number,
    transaction?: Transaction,
  ) {
    return await this.repository.update(
      {
        amount: newAmount,
      },
      {
        where: {
          id: userStockId,
        },
        transaction: transaction?.raw,
      },
    );
  }

  async createUserStock(
    userId: string,
    stockId: string,
    amount: number,
    transaction?: Transaction,
  ) {
    return await this.repository.create(
      {
        userId,
        stockId,
        amount,
      },
      {
        transaction: transaction?.raw,
      },
    );
  }
}
