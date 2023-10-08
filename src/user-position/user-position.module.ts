import { Module } from '@nestjs/common';
import { UserPositionController } from './user-position.controller';
import { UserPositionService } from './user-position.service';
import { UserModule } from 'src/user/user.module';
import { CheckingAccountModule } from 'src/checking-account/checking-account.module';

@Module({
  imports: [UserModule, CheckingAccountModule],
  controllers: [UserPositionController],
  providers: [UserPositionService]
})
export class UserPositionModule {}
