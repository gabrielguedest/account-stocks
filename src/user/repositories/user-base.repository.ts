import { Transaction } from '../../database/transaction';
import { UserModel } from '../models/user.model';

export interface CreateUserParams {
  name: string;
  cpf: string;
  password: string;
  salt: string;
  checkingAccount: string;
  transaction?: Transaction;
}

export abstract class UserBaseRepository {
  abstract createUser(params: CreateUserParams): Promise<UserModel>;
  abstract findUserByCpf(
    cpf: string,
    transaction?: Transaction,
  ): Promise<UserModel | null>;
}
