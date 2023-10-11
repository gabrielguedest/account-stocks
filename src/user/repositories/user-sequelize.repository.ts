import { Inject, Injectable } from '@nestjs/common';
import { CreateUserParams, UserBaseRepository } from './user-base.repository';
import { Transaction } from '../../database/transaction';
import { Constants } from '../../constants';
import { User } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserSequelizeRepository implements UserBaseRepository {
  constructor(
    @Inject(Constants.UserRepository)
    private readonly userRepository: typeof User,
  ) {}

  async createUser(params: CreateUserParams): Promise<UserModel> {
    const user = await this.userRepository.create(
      {
        name: params.name,
        cpf: params.cpf,
        password: params.password,
        salt: params.salt,
        checkingAccount: params.checkingAccount,
      },
      { transaction: params.transaction?.raw },
    );

    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      salt: user.salt,
      checkingAccount: user.checkingAccount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findUserByCpf(
    cpf: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({
      where: { cpf },
      transaction: transaction?.raw,
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      salt: user.salt,
      checkingAccount: user.checkingAccount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
