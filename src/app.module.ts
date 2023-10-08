import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CheckingAccountModule } from './checking-account/checking-account.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { UserPositionModule } from './user-position/user-position.module';
import { StocksModule } from './stocks/stocks.module';
import { UserStocksModule } from './user-stocks/user-stocks.module';

@Module({
  imports: [
    JwtAuthModule,
    UserModule,
    CheckingAccountModule,
    AuthModule,
    UserPositionModule,
    StocksModule,
    UserStocksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
