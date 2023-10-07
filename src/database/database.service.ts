import { Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Constants } from "../constants";
import { Transaction } from "./transaction";

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(Constants.Sequelize)
    private readonly sequelize: Sequelize,
  ) {}

  async transaction(): Promise<Transaction> {
    const transaction = await this.sequelize.transaction();
    return new Transaction(
      () => transaction.commit(),
      () => transaction.rollback(),
      transaction,
    );
  }
}