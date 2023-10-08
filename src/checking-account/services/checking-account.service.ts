import { Injectable } from "@nestjs/common";
import { CheckingAccountRepository } from "../repositories/checking-account.repository";
import { Transaction } from "../../database/transaction";
import { CheckingAccountModel } from "../models/checking-account.model";

@Injectable()
export class CheckingAccountService {
  constructor(
    private readonly checkingAccountRepository: CheckingAccountRepository,
  ) {}

  async createNewCheckingAccount(transaction?: Transaction): Promise<CheckingAccountModel> {
    const accountCode = await this.makeAccountCode();
    return await this.checkingAccountRepository.createCheckingAccount(accountCode, transaction);
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

    const isValid = await this.checkingAccountRepository.checkIfCodeIsAvailable(code);
    if (!isValid) {
      return this.makeAccountCode();
    }

    return code;
  }
  
  async getCheckingAccount(code: string) {
    return await this.checkingAccountRepository.getCheckingAccount(code);
  }
}