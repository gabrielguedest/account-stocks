import { Module } from '@nestjs/common';
import { UserPositionController } from './user-position.controller';
import { UserPositionService } from './user-position.service';
import { UserModule } from 'src/user/user.module';
import { CheckingAccountModule } from 'src/checking-account/checking-account.module';
import { UserStocksModule } from 'src/user-stocks/user-stocks.module';

@Module({
  imports: [
    UserModule,
    CheckingAccountModule,
    UserStocksModule,
  ],
  controllers: [UserPositionController],
  providers: [UserPositionService]
})
export class UserPositionModule {}
