import { Inject, Injectable } from '@nestjs/common';
import { Constants } from 'src/constants';
import { UserStock } from './user-stock.entity';
import { Stock } from 'src/stocks/stock.entity';

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
}
