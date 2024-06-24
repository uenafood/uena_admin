import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';

export class CustomerAddressTable extends Model<
  InferAttributes<CustomerAddressTable>,
  InferCreationAttributes<CustomerAddressTable>
> {
  declare customer_address_id: number;
  declare address: string;
  declare gmaps_url: string;
  declare notes: string;
  declare coordinates: string;
  declare customer_id: number;
}

export function setupCustomerAddressTable() {
  CustomerAddressTable.init(
    {
      customer_address_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gmaps_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      coordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'CustomerAddress',
      tableName: 'customer_address',
      schema: 'public',
      timestamps: false,
    },
  );
}

export function wiringCustomerAddressTableRelations() {}

export const customerAddressTableResource: ResourceWithOptions = {
  resource: CustomerAddressTable,
  options: {
    id: 'customer_address',
    parent: 'Order',
    properties: {
      address: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
