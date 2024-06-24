import { AdminJSOptions } from 'adminjs';

import { sequelizeMenu, sequelizeOrder, sequelizeOutlet, sequelizeUENA, sequelizeUser } from '../db/config.js';
import { userTableResource } from '../db/entity/user.entity.js';

import { componentLoader } from './component-loader.js';
import { orderTableResource } from '../db/entity/order.entity.js';
import { outletTableResource } from '../db/entity/outlet-prod.entity.js';
import { paymentMethodTableResource } from '../db/entity/payment_method.entity.js';
import { deliveryMethodTableResource } from '../db/entity/delivery_method.entity.js';
import { customerTableResource } from '../db/entity/customer.entity.js';
import { voidReasonTableResource } from '../db/entity/void_reason.entity.js';
import { customerAddressTableResource } from '../db/entity/customer_address.entity.js';
import { driverTableResource } from '../db/entity/driver.entity.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
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
  ],
  // locale: {
  //   language: 'en',
  //   translations: {
  //     resources: {
  //       orderTableResource: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //       Order: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //       order: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //       orderTable: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //       OrderTable: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //       order_new: {
  //         properties: {
  //           customer_name_platform: 'Customer',
  //         },
  //       },
  //     },
  //   },
  // },
  databases: [sequelizeOrder, sequelizeUser, sequelizeOutlet, sequelizeUENA, sequelizeMenu],
};

export default options;
