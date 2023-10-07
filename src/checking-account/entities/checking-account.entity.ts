import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'checking_accounts',
  timestamps: true,
  paranoid: true,
})
export class CheckingAccount extends Model<CheckingAccount> {
  @PrimaryKey
  @Column(DataType.STRING)
  code: string;

  @Column(DataType.INTEGER)
  balance: number;
}