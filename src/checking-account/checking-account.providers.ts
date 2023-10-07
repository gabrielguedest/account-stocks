import { Constants } from "src/constants";
import { CheckingAccount } from "./entities/checking-account.entity";

export const checkingAccountProviders = [
  {
    provide: Constants.CheckingAccountRepository,
    useValue: CheckingAccount,
  },
]