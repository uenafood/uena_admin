import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: process.env.DATABASE_DIALECT as any });

const sequelizeInventory = new Sequelize(process.env.DATABASE_URL_INVENTORY, {
  dialect: process.env.DATABASE_DIALECT as any,
});

const sequelizeMenu = new Sequelize(process.env.DATABASE_URL_MENU, {
  dialect: process.env.DATABASE_DIALECT as any,
});

const sequelizeUser = new Sequelize(process.env.DATABASE_URL_USER, {
  dialect: process.env.DATABASE_DIALECT as any,
});

const sequelizeOrder = new Sequelize(process.env.DATABASE_URL_UENA, {
  dialect: process.env.DATABASE_DIALECT as any,
});

export { sequelize, sequelizeInventory, sequelizeMenu, sequelizeUser, sequelizeOrder };
