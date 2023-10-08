import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckingAccountService } from 'src/checking-account/services/checking-account.service';
import { UserService } from 'src/user/services/user.service';
import { UserPositionResponseDTO } from './user-position.dto';
import { UserStocksService } from 'src/user-stocks/user-stocks.service';

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

    const checkingAccount = await this.checkingAccountService.getCheckingAccount(user.checkingAccount);
    const userStocks = await this.userStocksService.getUserStocks(user.id);

    return {
      checkingAccountAmount: checkingAccount.balance,
      positions: userStocks.stocks,
      consolidated: checkingAccount.balance + userStocks.total,
    }
  }
}
