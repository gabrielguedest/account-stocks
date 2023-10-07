process.env.NODE_ENV = process.env.NODE_ENV || 'local';

require('dotenv').config({
  path: require('path').resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});