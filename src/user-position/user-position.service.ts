import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckingAccountService } from 'src/checking-account/services/checking-account.service';
import { UserService } from 'src/user/services/user.service';
import { UserPositionResponseDTO } from './user-position.dto';

@Injectable()
export class UserPositionService {
  constructor(
    private readonly userService: UserService,
    private readonly checkingAccountService: CheckingAccountService,
  ) {}

  async getUserPosition(cpf: string): Promise<UserPositionResponseDTO> {
    const user = await this.userService.getUserByCpf(cpf);
    if (!user) {
      throw new UnauthorizedException();
    }

    const checkingAccount = await this.checkingAccountService.getCheckingAccount(user.checkingAccount);

    return {
      checkingAccountAmount: checkingAccount.balance,
      positions: [],
      consolidated: checkingAccount.balance,
    }
  }
}
