import { Sequelize } from 'sequelize';
import DotEnv from 'dotenv';

DotEnv.config();

/**
 * PRODUCTION !!!!!!!!!!!!!
 */
const sequelize = new Sequelize('postgres', 'postgres', 'Kokilogy*123', {
  host: 'database-1.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

const sequelizeMenu = new Sequelize('db_menu', 'postgres', 'Kokilogy*123', {
  host: 'database-1.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

const sequelizeUENA = new Sequelize('db_uena', 'postgres', 'Kokilogy*123', {
  host: 'database-1.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

const sequelizeOrder = new Sequelize('db_order', 'postgres', 'Kokilogy*123', {
  host: 'database-1.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

const sequelizeOutlet = new Sequelize('db_outlet', 'postgres', 'Kokilogy*123', {
  host: 'database-1.cxwznnuhmmdu.ap-southeast-1.rds.amazonaws.com',
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

export { sequelize, sequelizeMenu, sequelizeUENA, sequelizeOutlet, sequelizeOrder };
