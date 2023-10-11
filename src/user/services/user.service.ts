import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/user.dto';
import { DatabaseService } from '../../database/database.service';
import { UserBaseRepository } from '../repositories/user-base.repository';
import { UserAlreadyExists } from '../../utils/exceptions';
import { CheckingAccountService } from '../../checking-account/services/checking-account.service';
import { hashPassword } from '../../utils/utils';
import { JwtAuthService } from '../../jwt-auth/jwt-auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserBaseRepository,
    private readonly databaseService: DatabaseService,
    private readonly checkingAccountService: CheckingAccountService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.userRepository.findUserByCpf(data.cpf);
    if (user) {
      throw new UserAlreadyExists();
    }

    const transaction = await this.databaseService.transaction();

    try {
      const checkingAccount =
        await this.checkingAccountService.createNewCheckingAccount(transaction);
      const { pwdHash, salt } = await hashPassword(data.password);

      const user = await this.userRepository.createUser({
        name: data.name,
        cpf: data.cpf,
        password: pwdHash,
        salt: salt,
        checkingAccount: checkingAccount.code,
        transaction: transaction,
      });

      const token = await this.jwtAuthService.generateToken(user);

      await transaction.commit();

      return {
        acess_token: token,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUserByCpf(cpf: string) {
    return await this.userRepository.findUserByCpf(cpf);
  }
}
