import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GeneralConfig } from './config/general.config';
import { Configs } from './config/configs.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const generalConfig = configService.get<GeneralConfig>(Configs.GENERAL);

  await app.listen(generalConfig.port || 3000);
}
bootstrap();
