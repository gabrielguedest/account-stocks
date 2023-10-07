import { QueryInterface, Sequelize } from "sequelize";
import { DataType } from "sequelize-typescript";

const TABLE_NAME = 'stocks_transactions'

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(TABLE_NAME, {
    id: {
      type: DataType.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    stockId: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id',
      },
    },
    amount: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      defaultValue: Sequelize.literal('NOW()'),
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      defaultValue: Sequelize.literal('NOW()'),
      allowNull: false,
    },
    deletedAt: {
      type: DataType.DATE,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(TABLE_NAME);
}