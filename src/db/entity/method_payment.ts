import { Model, DataTypes, Optional } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';

interface IPaymentMethod {
  id: number;
  method: string;
  is_paid: boolean;
}
export type PaymentMethodAttributes = Optional<IPaymentMethod, 'id'>;

export class PaymentMethod extends Model<IPaymentMethod, PaymentMethodAttributes> {
  declare id: number;

  declare method: string;

  declare is_paid: boolean;
}

export function setupMethodPaymentTable() {
  PaymentMethod.init(
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

export const paymentMethodResource: ResourceWithOptions = {
  resource: PaymentMethod,
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
