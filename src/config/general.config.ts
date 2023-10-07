import { registerAs } from '@nestjs/config';
import { Configs } from './configs.enum';

export interface GeneralConfig {
  port: number
  env: string
}

export default registerAs(Configs.GENERAL, () => ({
  port: parseInt(process.env.PORT),
  env: process.env.NODE_ENV,
}))