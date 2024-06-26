import { AdminJSOptions } from 'adminjs';

import { sequelizeMenu, sequelizeOrder, sequelizeOutlet, sequelizeUENA } from '../db/config.js';
import { userTableResource } from '../db/entity/user.entity.js';

import { componentLoader } from './component-loader.js';
import { OrderTable, orderTableResource } from '../db/entity/order.entity.js';
import { outletTableResource } from '../db/entity/outlet.entity.js';
import { paymentMethodTableResource } from '../db/entity/payment_method.entity.js';
import { deliveryMethodTableResource } from '../db/entity/delivery_method.entity.js';
import { customerTableResource } from '../db/entity/customer.entity.js';
import { voidReasonTableResource } from '../db/entity/void_reason.entity.js';
import { customerAddressTableResource } from '../db/entity/customer_address.entity.js';
import { driverTableResource } from '../db/entity/driver.entity.js';
import { menuToOrderTableResource } from '../db/entity/menu_to_order.entity.js';
import { menuTableResource } from '../db/entity/menu.entity.js';
import { menuCategoryTableResource } from '../db/entity/menu_category.entity.js';
import { menuGroupResource } from '../db/entity/menu_group.entity.js';
import { menuOutletTableResource } from '../db/entity/menu_outlet.entity.js';
import { menuGroupOutletResource } from '../db/entity/menu_group_outlet.entity.js';

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
  ],
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
          customer_id: 'Phone Number',
        },
      },
    },
  },
  databases: [sequelizeOrder, sequelizeOutlet, sequelizeUENA, sequelizeMenu],
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
