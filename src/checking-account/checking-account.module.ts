import { Module } from "@nestjs/common";
import { CheckingAccountService } from "./services/checking-account.service";
import { CheckingAccountRepository } from "./repositories/checking-account.repository";
import { checkingAccountProviders } from "./checking-account.providers";

@Module({
  imports: [],
  providers: [
    CheckingAccountService,
    CheckingAccountRepository,
    ...checkingAccountProviders,
  ],
  exports: [
    CheckingAccountService,
  ],
})
export class CheckingAccountModule {}