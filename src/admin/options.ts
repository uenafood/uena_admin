import { AdminJSOptions, RecordActionResponse } from 'adminjs';
import bcrypt from 'bcrypt';

import { sequelizeInventory, sequelizeMenu, sequelizeOrder, sequelizeUser } from '../db/config.js';
import { Menu } from '../db/entity/menu.entity.js';
import { User } from '../db/entity/user.entity.js';
import { Order } from '../db/entity/order.entity.js';

import componentLoader from './component-loader.js';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: Menu,
      options: {
        id: 'menu',
        parent: {
          name: 'DB Uena STAGING',
          icon: 'Menu',
        },
      },
    },
    {
      resource: User,
      options: {
        id: 'user',
        parent: {
          name: 'DB Coolify STAGING',
          icon: 'User',
        },
        properties: {
          password: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload?.password) {
                request.payload.password = await hashPassword(request.payload.password);
              }
              return request;
            },
          },
          show: {
            after: async (response: RecordActionResponse) => {
              const user = await User.findByPk(response.record.params.id);
              if (user) {
                const { password, ...rest } = user.toJSON();
                response.record.params = rest;
              }
              return response;
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload?.password) {
                request.payload.password = await hashPassword(request.payload.password);
              }
              return request;
            },
            after: async (response: RecordActionResponse) => ({
              ...response,
              record: {
                ...response.record,
                params: {
                  ...response.record.params,
                  password: '',
                },
              },
            }),
          },
        },
      },
    },
    {
      resource: Order,
      options: {
        id: 'order',
        parent: {
          name: 'DB Uena STAGING',
          icon: 'Order',
        },
      },
    },
  ],
  databases: [sequelizeInventory, sequelizeMenu, sequelizeUser, sequelizeOrder],
};

export default options;
