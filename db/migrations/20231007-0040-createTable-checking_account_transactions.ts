import { QueryInterface, Sequelize } from "sequelize";
import { DataType } from "sequelize-typescript";

const TABLE_NAME = 'checking_account_transactions'

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(TABLE_NAME, {
    id: {
      type: DataType.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataType.STRING,
      allowNull: false,
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
    },
    checkingAccount: {
      type: DataType.STRING,
      allowNull: false,
      references: {
        model: 'checking_accounts',
        key: 'code',
      },
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