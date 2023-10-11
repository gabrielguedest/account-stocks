import { Constants } from '../constants';
import { UserStock } from './user-stock.entity';

export const userStocksProviders = [
  {
    provide: Constants.UserStocksRepository,
    useValue: UserStock,
  },
];
