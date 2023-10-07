import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";
import generalConfig from "./general.config";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [generalConfig, databaseConfig],
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}