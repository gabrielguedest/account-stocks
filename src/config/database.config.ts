import { registerAs } from '@nestjs/config';
import { Configs } from './configs.enum';

export interface DatabaseConfig {
  host: number
  port: number
  username: string
  password: string
  database: string
}

export default registerAs(Configs.DATABASE, () => ({
  host: parseInt(process.env.DATABASE_HOST),
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}))