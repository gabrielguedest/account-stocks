import { Constants } from '../../utils/constants';
import { CheckingAccount } from '../entities/checking-account.entity';
import { Inject } from '@nestjs/common';
import { CheckingAccountModel } from '../models/checking-account.model';
import { Transaction } from '../../database/transaction';

export class CheckingAccountRepository {
  constructor(
    @Inject(Constants.CheckingAccountRepository)
    private readonly checkingAccountRepository: typeof CheckingAccount,
  ) {}

  async createCheckingAccount(
    accountCode: string,
    transaction?: Transaction,
  ): Promise<CheckingAccountModel> {
    const checkingAccount = await this.checkingAccountRepository.create(
      {
        code: accountCode,
      },
      { transaction: transaction?.raw },
    );

    return {
      code: checkingAccount.code,
      balance: checkingAccount.balance,
      createdAt: checkingAccount.createdAt,
      updatedAt: checkingAccount.updatedAt,
    };
  }

  async checkIfCodeIsAvailable(accountCode: string): Promise<boolean> {
    const checkingAccount = await this.checkingAccountRepository.findOne({
      where: { code: accountCode },
    });

    return checkingAccount === null;
  }

  async getCheckingAccount(
    accountCode: string,
    transaction?: Transaction,
  ): Promise<CheckingAccountModel> {
    const checkingAccount = await this.checkingAccountRepository.findOne({
      where: { code: accountCode },
      transaction: transaction?.raw,
    });

    return {
      code: checkingAccount.code,
      balance: checkingAccount.balance,
      createdAt: checkingAccount.createdAt,
      updatedAt: checkingAccount.updatedAt,
    };
  }

  async updateBalance(
    accountCode: string,
    newBalance: number,
    transaction?: Transaction,
  ) {
    await this.checkingAccountRepository.update(
      {
        balance: newBalance,
      },
      {
        where: { code: accountCode },
        transaction: transaction?.raw,
        returning: true,
      },
    );
  }
}
