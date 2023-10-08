import { Constants } from "src/constants";
import { Stock } from "./stock.entity";

export const stocksProviders = [
  {
    provide: Constants.StocksRepository,
    useValue: Stock,
  }
]