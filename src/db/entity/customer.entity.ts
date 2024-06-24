import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';

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

export function wiringCustomerRelations() {}

export const customerTableResource: ResourceWithOptions = {
  resource: CustomerTable,
  options: {
    id: 'customer',
    parent: 'Order',
    properties: {
      name: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
