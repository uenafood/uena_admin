import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { OrderTable } from './order.entity.js';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class CustomerTable extends Model<InferAttributes<CustomerTable>, InferCreationAttributes<CustomerTable>> {
  declare customer_id: number;
  declare name: string;
  declare phone_number: string;
  declare qiscus_contact_id: number;
}

export function setupCustomerTable() {
  CustomerTable.init(
    {
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      qiscus_contact_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'Customer',
      tableName: 'customer',
      schema: 'public',
      timestamps: false,
    },
  );
}

export function wiringCustomerRelations() {
  CustomerTable.hasMany(OrderTable, {
    foreignKey: 'customer_id',
  });
}

export const customerTableResource: ResourceWithOptions = {
  resource: CustomerTable,
  features: [disableAllActions()],
  options: {
    id: 'customer',
    parent: 'Order',
    properties: {
      /**
       * in some case, we need unset isTitle to false
       * trick to ignore name as title
       * reference https://github.com/SoftwareBrothers/adminjs/issues/420
       * */
      name: {
        isTitle: false,
      },
      phone_number: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
