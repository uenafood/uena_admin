import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class DeliveryMethodTable extends Model<
  InferAttributes<DeliveryMethodTable>,
  InferCreationAttributes<DeliveryMethodTable>
> {
  declare id: CreationOptional<number>;
  declare method: string;
  declare is_detail_needed: boolean;
  declare is_courier_code_needed: boolean;
}

export function setupDeliveryMethodTable() {
  DeliveryMethodTable.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_detail_needed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      is_courier_code_needed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'DeliveryMethod',
      tableName: 'delivery_method',
      timestamps: false,
    },
  );
}

export function wiringDeliveryMethodRelations() {}

export const deliveryMethodTableResource: ResourceWithOptions = {
  resource: DeliveryMethodTable,
  features: [disableAllActions()],
  options: {
    id: 'delivery_method',
    parent: 'Order',
    properties: {
      method: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
