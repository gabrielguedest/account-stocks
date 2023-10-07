import { QueryInterface, Sequelize } from "sequelize";
import { DataType } from "sequelize-typescript";

const TABLE_NAME = 'checking_accounts'

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(TABLE_NAME, {
    code: {
      type: DataType.STRING,
      primaryKey: true,
      unique: true,
    },
    balance: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
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