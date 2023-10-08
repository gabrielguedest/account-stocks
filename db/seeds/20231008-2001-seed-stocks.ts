import { Op } from "sequelize";
import { QueryInterface } from "sequelize";

const TABLE_NAME = 'stocks'
const STOCKS = [
  {
    symbol: "PETR4",
    price: 2844
  },
  {
    symbol: "MGLU3",
    price: 2591
  },
  {
    symbol: "VVAR3",
    price: 2591
  },
  {
    symbol: "SANB11",
    price: 4077
  },
  {
    symbol: "TORO4",
    price: 1198
  },
]

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.bulkInsert(TABLE_NAME, STOCKS, { transaction });
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.bulkDelete(TABLE_NAME, {
      where: {
        symbol: {
          [Op.in]: STOCKS.map(stock => stock.symbol),
        }
      }
    }, { transaction });
  });
}