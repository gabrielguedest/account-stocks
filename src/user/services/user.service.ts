import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/user.dto";
import { DatabaseService } from "../../database/database.service";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserAlreadyExists } from "../../exceptions";
import { CheckingAccountService } from "../../checking-account/services/checking-account.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserBaseRepository,
    private readonly databaseService: DatabaseService,
    private readonly checkingAccountService: CheckingAccountService,
  ) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.userRepository.findUserByCpf(data.cpf);
    if (user) {
      throw new UserAlreadyExists();
    }

    const transaction = await this.databaseService.transaction();
    
    try {
      const checkingAccount = await this.checkingAccountService.createNewCheckingAccount();
      const user = await this.userRepository.createUser({
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        salt: 'salt',
        checkingAccount: checkingAccount.code,
        transaction: transaction,
      });

      await transaction.commit();

      return {
        name: data.name,
        checkingAccount: {
          code: checkingAccount.code,
          balance: checkingAccount.balance,
        },
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUserByCpf(cpf: string) {
    return await this.userRepository.findUserByCpf(cpf);
  }
}