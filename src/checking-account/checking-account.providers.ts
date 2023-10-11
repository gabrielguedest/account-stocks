import { Constants } from '../utils/constants';
import { CheckingAccount } from './entities/checking-account.entity';

export const checkingAccountProviders = [
  {
    provide: Constants.CheckingAccountRepository,
    useValue: CheckingAccount,
  },
];
