import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { stocksProviders } from './stocks.providers';

@Module({
  controllers: [StocksController],
  providers: [
    StocksService,
    StocksRepository,
    ...stocksProviders,
  ],
})
export class StocksModule {}
