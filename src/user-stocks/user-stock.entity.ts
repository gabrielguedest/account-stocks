import { Column, DataType, Default, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Stock } from "src/stocks/stock.entity";

@Table({
  tableName: 'user_stocks',
  timestamps: true,
  paranoid: true,
})
export class UserStock extends Model<UserStock> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  userId: string;

  @Column(DataType.NUMBER)
  amount: number;

  @Column(DataType.UUIDV4)
  stockId: string;

  @HasOne(() => Stock, {
    sourceKey: 'stockId',
    foreignKey: 'id',
  })
  stock: Stock;
}