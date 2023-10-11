import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserService } from './services/user.service';
import { DatabaseModule } from '../database/database.module';
import { UserSequelizeRepository } from './repositories/user-sequelize.repository';
import { CheckingAccountModule } from '../checking-account/checking-account.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, CheckingAccountModule],
  controllers: [UserController],
  providers: [UserService, UserSequelizeRepository, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
