import { Sequelize } from 'sequelize';
import DotEnv from 'dotenv';

DotEnv.config();

const sequelize = new Sequelize('postgres', 'postgres', 'Kokilogy*123', {
  host: 'staging.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

const sequelizeMenu = new Sequelize('db_menu', 'postgres', 'Kokilogy*123', {
  host: 'staging.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

const sequelizeUser = new Sequelize(
  'postgres',
  'postgres',
  'mQQ5SkRjYlIpkpCkZNRNcTaoluQ0YYG5EZLDPEmiQ1VHt9bC2W3sO1jS9TalN0cR',
  {
    host: '46.250.239.222',
    port: Number('8989'),
    dialect: 'postgres',
    logging: false,
  },
);

const sequelizeUENA = new Sequelize('db_uena', 'postgres', 'Kokilogy*123', {
  host: 'staging.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

const sequelizeOutlet = new Sequelize('db_outlet', 'postgres', 'Kokilogy*123', {
  host: 'staging.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

export { sequelize, sequelizeMenu, sequelizeUser, sequelizeUENA, sequelizeOutlet };
