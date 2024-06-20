import { AdminJSOptions, RecordActionResponse } from 'adminjs';

import { sequelizeMenu, sequelizeOutlet, sequelizeUENA, sequelizeUser } from '../db/config.js';
import { menuResource } from '../db/entity/menu.entity.js';
import { userResource } from '../db/entity/user.entity.js';

import { componentLoader } from './component-loader.js';
import { outletResource } from '../db/entity/outlet.entity.js';
import { menuGroupOutletResource } from '../db/entity/menu_group_outlet.entity.js';
import { menuCategoryResource } from '../db/entity/menu_category.entity.js';
import { menuOutletResource } from '../db/entity/menu_outlet.entity.js';
import { orderResource } from '../db/entity/order.entity.js';
import { paymentMethodResource } from '../db/entity/method_payment.js';
import { menuGroupResource } from '../db/entity/menu_group.entity.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    menuResource,
    userResource,
    outletResource,
    menuOutletResource,
    menuGroupOutletResource,
    menuCategoryResource,
    orderResource,
    paymentMethodResource,
    menuGroupResource,
  ],
  databases: [sequelizeMenu, sequelizeUser, sequelizeUENA, sequelizeOutlet],
};

export default options;
