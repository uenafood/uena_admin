import { Sequelize } from 'sequelize';
import DotEnv from 'dotenv';

DotEnv.config();

/**
 * PRODUCTION !!!!!!!!!!!!!
 */
const sequelize = new Sequelize('postgres', 'postgres', process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  logging: false,
});

const sequelizeMenu = new Sequelize('db_menu', 'postgres', process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  logging: false,
});

const sequelizeUENA = new Sequelize('db_uena', 'postgres', process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

const sequelizeOrder = new Sequelize('db_order', 'postgres', process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  logging: false,
});

const sequelizeOutlet = new Sequelize('db_outlet', 'postgres', process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  // port: Number(''),
  dialect: 'postgres',
  logging: false,
});

export { sequelize, sequelizeMenu, sequelizeUENA, sequelizeOutlet, sequelizeOrder };
