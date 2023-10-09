import { Module } from '@nestjs/common';
import { UserStocksService } from './user-stocks.service';
import { UserStocksRepository } from './user-stocks.repository';
import { userStocksProviders } from './user-stocks.providers';
import { UserStocksController } from './user-stocks.controller';
import { UserModule } from 'src/user/user.module';
import { CheckingAccountModule } from 'src/checking-account/checking-account.module';
import { StocksModule } from 'src/stocks/stocks.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CheckingAccountModule,
    StocksModule,
  ],
  providers: [
    UserStocksService,
    UserStocksRepository,
    ...userStocksProviders,
  ],
  exports: [UserStocksService],
  controllers: [UserStocksController]
})
export class UserStocksModule {}
