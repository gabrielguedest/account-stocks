import { Injectable, BadRequestException } from '@nestjs/common';
import { CheckingAccountRepository } from '../repositories/checking-account.repository';
import { Transaction } from '../../database/transaction';
import { CheckingAccountModel } from '../models/checking-account.model';

@Injectable()
export class CheckingAccountService {
  constructor(
    private readonly checkingAccountRepository: CheckingAccountRepository,
  ) {}

  async createNewCheckingAccount(
    transaction?: Transaction,
  ): Promise<CheckingAccountModel> {
    const accountCode = await this.makeAccountCode();
    return await this.checkingAccountRepository.createCheckingAccount(
      accountCode,
      transaction,
    );
  }

  async makeAccountCode(): Promise<string> {
    const availableChars = '0123456789';
    const codeLength = 6;

    let code = '';
    let counter = 0;

    while (counter < 6) {
      code += availableChars.charAt(Math.floor(Math.random() * codeLength));
      counter += 1;
    }

    const isValid = await this.checkingAccountRepository.checkIfCodeIsAvailable(
      code,
    );
    if (!isValid) {
      return this.makeAccountCode();
    }

    return code;
  }

  async getCheckingAccount(accountCode: string) {
    return await this.checkingAccountRepository.getCheckingAccount(accountCode);
  }

  async withdraw(
    accountCode: string,
    amount: number,
    transaction?: Transaction,
  ) {
    const account = await this.checkingAccountRepository.getCheckingAccount(
      accountCode,
      transaction,
    );
    if (!account) {
      throw new BadRequestException('Conta corrente não encontrada');
    }

    if (account.balance < amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    await this.checkingAccountRepository.updateBalance(
      accountCode,
      account.balance - amount,
      transaction,
    );
  }
}
