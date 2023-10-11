import { Constants } from '../utils/constants';
import { Stock } from './stock.entity';

export const stocksProviders = [
  {
    provide: Constants.StocksRepository,
    useValue: Stock,
  },
];
