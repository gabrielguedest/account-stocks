import { Module } from "@nestjs/common";
import { userProviders } from "./user.provider";
import { UserService } from "./services/user.service";
import { DatabaseModule } from "src/database/database.module";
import { UserSequelizeRepository } from "./repositories/user-sequelize.repository";
import { CheckingAccountModule } from "src/checking-account/checking-account.module";

@Module({
  imports: [
    DatabaseModule,
    CheckingAccountModule,
  ],
  controllers: [],
  providers: [
    UserService,
    UserSequelizeRepository,
    ...userProviders,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}