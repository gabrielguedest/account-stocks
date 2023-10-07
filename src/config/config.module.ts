import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}