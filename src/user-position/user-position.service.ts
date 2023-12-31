import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckingAccountService } from '../checking-account/services/checking-account.service';
import { UserService } from '../user/services/user.service';
import { UserPositionResponseDTO } from './user-position.dto';
import { UserStocksService } from '../user-stocks/user-stocks.service';

@Injectable()
export class UserPositionService {
  constructor(
    private readonly userService: UserService,
    private readonly checkingAccountService: CheckingAccountService,
    private readonly userStocksService: UserStocksService,
  ) {}

  async getUserPosition(cpf: string): Promise<UserPositionResponseDTO> {
    const user = await this.userService.getUserByCpf(cpf);
    if (!user) {
      throw new UnauthorizedException();
    }

    const checkingAccount =
      await this.checkingAccountService.getCheckingAccount(
        user.checkingAccount,
      );
    const userStocks = await this.userStocksService.getUserStocks(user.id);

    return {
      checkingAccountAmount: checkingAccount.balance / 100,
      positions: userStocks.stocks.map((stock) => ({
        ...stock,
        currentPrice: stock.currentPrice / 100,
      })),
      consolidated: (checkingAccount.balance + userStocks.total) / 100,
    };
  }
}
