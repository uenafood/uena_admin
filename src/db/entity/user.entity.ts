import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { hashPassword } from '../../admin/utils.js';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare email: string;
  declare password: string;
}

export function setupUserTable() {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeUENA,
      tableName: 'user_admin_js',
      modelName: 'User',
      updatedAt: false,
      createdAt: false,
    },
  );
}

export function wiringUserTableRelations() {}

export const userTableResource: ResourceWithOptions = {
  resource: User,
  options: {
    id: 'user_admin_js',
    parent: {
      name: 'User',
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
};
