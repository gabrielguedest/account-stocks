import '../dotenv';
import { Sequelize } from "sequelize";
import { getConnectionConfig } from "../src/database/database.providers";
import * as Umzug from "umzug";

async function migrate() {
  const sequelize = new Sequelize(getConnectionConfig());
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      modelName: 'SequelizeMeta',
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor,
      ],
      path: './db/migrations',
      pattern: /\.ts$/,
    },
  });

  const pending = await umzug.pending();
  if (!pending.length) {
    console.log('No migrations to run');
    return;
  }

  pending.map(p => console.log(p.file));
  await umzug.up();
}

migrate();
