import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
import { Constants } from "../constants";
import { DatabaseConfig } from "src/config/database.config";
import { Configs } from "src/config/configs.enum";

export const databaseProviders = [
  {
    provide: Constants.Sequelize,
    useValue: (configService: ConfigService) => getSequelize(configService),
    inject: [ConfigService],
  }
]

function getSequelize(configService: ConfigService) {
  const dbConfig = configService.get<DatabaseConfig>(Configs.Database);
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    logging: (query) => {
      // console.log('Sequelize query: ', query)
    },
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    }
  });

  const fileExt = __dirname.includes('dist') ? 'js' : 'ts';
  sequelize.addModels([`${__dirname}/../**/*.entity.${fileExt}`]);
  return sequelize
}