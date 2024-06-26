import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';

import { sequelize } from './config.js';
import { setupUserTable } from './entity/user.entity.js';
import { setupOutletTable, wiringOutletTableRelations } from './entity/outlet-prod.entity.js';
import { setupMenuCategoryTable } from './entity/menu_category.entity.js';
import { setupMenuGroupTable, wiringMenuGroupTableRelations } from './entity/menu_group.entity.js';
import { setupMenuOutletTable, wiringMenuOutletTableRelations } from './entity/menu_outlet.entity.js';
import { setupMenuGroupOutletTable, wiringMenuGroupOutletTableRelations } from './entity/menu_group_outlet.entity.js';
import { setupMenuTable, wiringMenuTableRelations } from './entity/menu.entity.js';
import { setupPaymentMethod } from './entity/payment_method.entity.js';
import { setupOrderTable, wiringOrderTableRelations } from './entity/order.entity.js';
import { setupDeliveryMethodTable } from './entity/delivery_method.entity.js';
import { setupCustomerTable, wiringCustomerRelations } from './entity/customer.entity.js';
import { setupVoidReasonTable } from './entity/void_reason.entity.js';
import { setupCustomerAddressTable } from './entity/customer_address.entity.js';
import { setupDriverTable } from './entity/driver.entity.js';
import { setupMenuToOrderTable, wiringMenuToOrderTableRelations } from './entity/menu_to_order.entity.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});

/**
 * TODO: Setup all tables
 */
function setupTables() {
  setupOrderTable();
  setupPaymentMethod();
  setupUserTable();
  setupDeliveryMethodTable();
  setupCustomerTable();
  setupVoidReasonTable();
  setupCustomerAddressTable();
  setupDriverTable();
  setupMenuTable();
  setupMenuCategoryTable();
  setupMenuToOrderTable();
  setupMenuGroupTable();
  setupMenuOutletTable();
  setupMenuGroupOutletTable();
  setupOutletTable();
}

/**
 * TODO: Wiring all tables
 */
function wiringAllTables() {
  wiringOutletTableRelations();
  wiringOrderTableRelations();
  wiringMenuTableRelations();
  wiringMenuOutletTableRelations();
  wiringMenuGroupOutletTableRelations();
  wiringMenuToOrderTableRelations();
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
