import { Module } from '@nestjs/common';
import { UserStocksService } from './user-stocks.service';
import { UserStocksRepository } from './user-stocks.repository';
import { userStocksProviders } from './user-stocks.providers';

@Module({
  providers: [
    UserStocksService,
    UserStocksRepository,
    ...userStocksProviders,
  ],
  exports: [UserStocksService]
})
export class UserStocksModule {}
