import { Model, DataTypes, Optional, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class PaymentMethodTable extends Model<
  InferAttributes<PaymentMethodTable>,
  InferCreationAttributes<PaymentMethodTable>
> {
  declare id: number;
  declare method: string;
  declare is_paid: boolean;
}

export function setupPaymentMethod() {
  PaymentMethodTable.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'PaymentMethod',
      tableName: 'payment_method',
      schema: 'public',
      timestamps: false,
    },
  );
}

export function wiringPaymentMethodRelations() {}

export const paymentMethodTableResource: ResourceWithOptions = {
  resource: PaymentMethodTable,
  features: [disableAllActions()],
  options: {
    id: 'payment_method',
    parent: 'Order',
    properties: {
      method: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
