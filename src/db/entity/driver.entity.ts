import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class DriverTable extends Model<InferAttributes<DriverTable>, InferCreationAttributes<DriverTable>> {
  declare driver_id: string;
  declare name: string;
  declare phone_number: string;
  declare password: string;
  declare status: string;
  declare driver_airtable_id: string;
}

export function setupDriverTable() {
  DriverTable.init(
    {
      driver_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_airtable_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'Driver',
      tableName: 'driver',
      schema: 'public',
      timestamps: false,
    },
  );
}

export function wiringDriverTableRelations() {}

export const driverTableResource: ResourceWithOptions = {
  resource: DriverTable,
  features: [disableAllActions()],
  options: {
    id: 'driver',
    parent: 'Order',
    properties: {
      name: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
