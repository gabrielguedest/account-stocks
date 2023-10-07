import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CheckingAccountModule } from './checking-account/checking-account.module';

@Module({
  imports: [
    UserModule,
    CheckingAccountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
