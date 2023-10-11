import { Module } from '@nestjs/common';
import { UserPositionController } from './user-position.controller';
import { UserPositionService } from './user-position.service';
import { UserModule } from '../user/user.module';
import { CheckingAccountModule } from '../checking-account/checking-account.module';
import { UserStocksModule } from '../user-stocks/user-stocks.module';

@Module({
  imports: [UserModule, CheckingAccountModule, UserStocksModule],
  controllers: [UserPositionController],
  providers: [UserPositionService],
})
export class UserPositionModule {}
