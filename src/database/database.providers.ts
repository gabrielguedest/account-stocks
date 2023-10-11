import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Constants } from '../constants';
import '../../dotenv';

export const databaseProviders = [
  {
    provide: Constants.Sequelize,
    useValue: getSequelize(),
  },
];

function getSequelize() {
  const sequelize = new Sequelize(getConnectionConfig());
  const fileExt = __dirname.includes('dist') ? 'js' : 'ts';
  sequelize.addModels([`${__dirname}/../**/*.entity.${fileExt}`]);
  return sequelize;
}

export function getConnectionConfig(): SequelizeOptions {
  return {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    logging: (query) => {
      // console.log('Sequelize query: ', query)
    },
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.entity')).replace('-', '') ===
        member.toLowerCase()
      );
    },
  };
}
