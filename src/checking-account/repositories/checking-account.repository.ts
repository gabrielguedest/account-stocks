import { Constants } from "../../constants";
import { CheckingAccount } from "../entities/checking-account.entity";
import { Inject } from "@nestjs/common";
import { CheckingAccountModel } from "../models/checking-account.model";
import { Transaction } from "../../database/transaction";

export class CheckingAccountRepository {
  constructor(
    @Inject(Constants.CheckingAccountRepository)
    private readonly checkingAccountRepository: typeof CheckingAccount,
  ) {}

  async createCheckingAccount(code: string, transaction?: Transaction): Promise<CheckingAccountModel> {
    const checkingAccount = await this.checkingAccountRepository.create({
      code,
    }, { transaction: transaction?.raw });

    return {
      code: checkingAccount.code,
      balance: checkingAccount.balance,
      createdAt: checkingAccount.createdAt,
      updatedAt: checkingAccount.updatedAt,
    }
  }

  async checkIfCodeIsAvailable(code: string): Promise<boolean> {
    const checkingAccount = await this.checkingAccountRepository.findOne({
      where: { code },
    });

    return checkingAccount === null;
  }
}