import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';

import { sequelize } from './config.js';
import { setupOrderTable, wiringOrderTableRelations } from './entity/order.entity.js';
import { setupUserTable } from './entity/user.entity.js';
import { setupOutletTable } from './entity/outlet.entity.js';
import { setupMenuCategoryTable } from './entity/menu_category.entity.js';
import { setupMenuGroupTable, wiringMenuGroupTableRelations } from './entity/menu_group.entity.js';
import { setupMenuOutletTable, wiringMenuOutletTableRelations } from './entity/menu_outlet.entity.js';
import { setupMenuGroupOutletTable, wiringMenuGroupOutletTableRelations } from './entity/menu_group_outlet.entity.js';
import { setupMenuTable, wiringMenuTableRelations } from './entity/menu.entity.js';
import { setupMethodPaymentTable } from './entity/method_payment.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});

/**
 * TODO: Setup all tables
 */
function setupTables() {
  setupOrderTable();
  setupMethodPaymentTable();
  setupUserTable();

  /**
   * OUTLET
   */
  setupOutletTable();

  /**
   * MENU
   */
  setupMenuOutletTable();
  setupMenuTable();
  setupMenuCategoryTable();
  setupMenuGroupTable();
  setupMenuGroupOutletTable();
}

/**
 * TODO: Wiring all tables
 */
function wiringAllTables() {
  wiringOrderTableRelations();
  wiringMenuTableRelations();
  wiringMenuOutletTableRelations();
  wiringMenuGroupOutletTableRelations();
  wiringMenuGroupTableRelations();
}

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    setupTables();
    wiringAllTables();

    return { sequelize };
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return {};
  }
};

export default initialize;
