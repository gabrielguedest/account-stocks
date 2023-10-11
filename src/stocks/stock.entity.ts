import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'stocks',
  timestamps: true,
  paranoid: true,
})
export class Stock extends Model<Stock> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  symbol: string;

  @Column(DataType.INTEGER)
  price: number;
}
