import { Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Unique(true)
  @Column(DataType.STRING)
  cpf: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  salt: string;

  @Column(DataType.STRING)
  checkingAccount: string;
}