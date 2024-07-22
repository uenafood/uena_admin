import { AdminJSOptions } from 'adminjs';

import { sequelizeMenu, sequelizeOrder, sequelizeOutlet, sequelizeUENA } from '../db/config.js';
import { userTableResource } from '../db/entity/user.entity.js';

import { Components, componentLoader } from './component-loader.js';
import { OrderTable, orderTableResource } from '../db/entity/order.entity.js';
import { OutletTable, outletTableResource } from '../db/entity/outlet.entity.js';
import { paymentMethodTableResource } from '../db/entity/payment_method.entity.js';
import { deliveryMethodTableResource } from '../db/entity/delivery_method.entity.js';
import { customerTableResource } from '../db/entity/customer.entity.js';
import { voidReasonTableResource } from '../db/entity/void_reason.entity.js';
import { customerAddressTableResource } from '../db/entity/customer_address.entity.js';
import { driverTableResource } from '../db/entity/driver.entity.js';
import { menuToOrderTableResource } from '../db/entity/menu_to_order.entity.js';
import { MenuTable, menuTableResource } from '../db/entity/menu.entity.js';
import { menuCategoryTableResource } from '../db/entity/menu_category.entity.js';
import { MenuGroupTable, menuGroupResource } from '../db/entity/menu_group.entity.js';
import { MenuOutlet, menuOutletTableResource } from '../db/entity/menu_outlet.entity.js';
import { MenuGroupOutlet, menuGroupOutletResource } from '../db/entity/menu_group_outlet.entity.js';
import { outletOperationalHourTableResource } from '../db/entity/outlet_operational_hour.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/',
  resources: [
    orderTableResource,
    userTableResource,
    outletTableResource,
    paymentMethodTableResource,
    deliveryMethodTableResource,
    customerTableResource,
    customerAddressTableResource,
    voidReasonTableResource,
    driverTableResource,
    menuTableResource,
    menuCategoryTableResource,
    menuOutletTableResource,
    menuGroupResource,
    menuGroupOutletResource,
    menuToOrderTableResource,
    outletOperationalHourTableResource,
  ],
  pages: {
    assignMenuToOutlet: {
      handler: async (request, response, context) => {
        // get menu
        const menu = await MenuTable.findAll();
        const outlet = await OutletTable.findAll();
        const menuGroup = await MenuGroupTable.findAll();

        return {
          menu,
          outlet,
          menuGroup,
        };
      },
      component: Components.AssignMenuPages,
      icon: 'Plus',
    },
    editMenuToOutlet: {
      handler: async (request, response, context) => {
        const outlet = await OutletTable.findAll();
        const menuOutlet = await MenuOutlet.findAll({
          include: [
            {
              model: MenuGroupOutlet,
              attributes: ['menu_group_id', 'menu_group_outlet_id', 'outlet_id'],
              include: [
                {
                  model: MenuGroupTable,
                  attributes: ['menu_group_id', 'name'],
                },
              ],
            },
          ],
        });

        return {
          outlet,
          menuOutlet,
        };
      },
      component: Components.EditMenuPages,
      icon: 'Edit',
    },
    soldOutMenu: {
      handler: async (request, response, context) => {
        const outlet = await OutletTable.findAll({
          where: {
            deleted_at: null,
          },
        });
        const menu = await MenuTable.findAll({
          where: {
            deleted_at: null,
          },
        });
        const menuOutlet = await MenuOutlet.findAll({
          where: {
            deleted_at: null,
          },
          include: [
            {
              model: MenuGroupOutlet,
              attributes: ['menu_group_id', 'menu_group_outlet_id', 'outlet_id'],
              include: [
                {
                  model: MenuGroupTable,
                  attributes: ['menu_group_id', 'name'],
                },
              ],
            },
          ],
        });

        return {
          menu,
          outlet,
          menuOutlet,
        };
      },
      component: Components.SoldOutMenu,
      icon: 'XCircle',
    },
    editMenuGroupOutlet: {
      handler: async (request, response, context) => {
        const outlet = await OutletTable.findAll();
        const menuGroup = await MenuGroupTable.findAll();
        const menuGroupOutlet = await MenuGroupOutlet.findAll();

        return {
          outlet,
          menuGroup,
          menuGroupOutlet,
        };
      },
      component: Components.EditMenuGroupPages,
      // icon: 'Edit',
    },
  },
  locale: {
    language: 'en',
    availableLanguages: ['en'],
    translations: {
      en: {
        properties: {
          delivery_method: 'Delivery',
          payment_method: 'Payment',
          customer_name_platform: 'CU Name',
          voucher_code: 'Voucher',
          received_by_customer_date: 'Received by CU Date',
          customer_id: 'Customer Phone',
        },
      },
    },
  },
  databases: [sequelizeOrder, sequelizeOutlet, sequelizeUENA, sequelizeMenu],
  dashboard: {
    component: Components.Dashboard,
  },
  assets: {
    styles: ['/styles.css'],
  },
  branding: {
    companyName: 'UENA Admin',
    logo: '/logouena.svg',
    withMadeWithLove: false,
    favicon: '/favicon.ico',
  },
};

export default options;
