import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomConfigModule } from './config/config.module';

@Module({
  imports: [
    CustomConfigModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
