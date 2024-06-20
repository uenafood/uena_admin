import {
  Model,
  DataTypes,
  CreationOptional,
  NonAttribute,
  Association,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { sequelizeUENA } from '../config.js';

import { PaymentMethod } from './method_payment.js';
import { ResourceWithOptions } from 'adminjs';

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;

  declare order_date: Date;

  declare ref_code: string;

  declare delivery_method: number;

  declare payment_method: number;

  declare customer_id: number;

  declare customer_address_id: number;

  declare is_already_paid: boolean;

  declare outlet_id: number;

  declare outlet_group: string;

  declare is_source_app: boolean;

  declare total_payment: number;

  declare sub_total: number;

  declare point_used: number;

  declare voucher_discount: number;

  declare voucher_code: string;

  declare delivery_fee: number;

  declare pb_fee: number;

  declare order_notes: string;

  declare nps_score: number;

  declare nps_feedback: string;

  declare is_big_order: boolean;

  declare courier_code: string;

  declare finish_cooking_date: Date;

  declare received_by_customer_date: Date;

  declare is_void: boolean;

  declare void_category_id: number;

  declare void_reason: string;

  declare app_status: string;

  declare driver_id: string;

  declare order_id: string;

  declare outlet_alias: string;

  declare platform_id: string;

  declare customer_name_platform: string;

  declare platform_fee: number;

  declare is_received_nps: boolean;

  declare order_date_utc_7: Date;

  declare paymentMethod?: NonAttribute<PaymentMethod>;

  declare static associations: {
    paymentMethod: Association<Order, PaymentMethod>;
  };
}

export function setupOrderTable() {
  Order.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ref_code: {
        type: DataTypes.STRING,
      },
      delivery_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 38,
      },
      customer_address_id: {
        type: DataTypes.BIGINT,
      },
      is_already_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      outlet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      outlet_group: {
        type: DataTypes.STRING,
      },
      is_source_app: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      total_payment: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      point_used: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      voucher_discount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      voucher_code: {
        type: DataTypes.STRING,
      },
      delivery_fee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      pb_fee: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      order_notes: {
        type: DataTypes.TEXT,
      },
      nps_score: {
        type: DataTypes.INTEGER,
      },
      nps_feedback: {
        type: DataTypes.TEXT,
      },
      is_big_order: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      courier_code: {
        type: DataTypes.STRING,
      },
      finish_cooking_date: {
        type: DataTypes.DATE,
      },
      received_by_customer_date: {
        type: DataTypes.DATE,
      },
      is_void: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      void_category_id: {
        type: DataTypes.INTEGER,
      },
      void_reason: {
        type: DataTypes.TEXT,
      },
      app_status: {
        type: DataTypes.STRING,
      },
      driver_id: {
        type: DataTypes.STRING,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outlet_alias: {
        type: DataTypes.STRING,
      },
      platform_id: {
        type: DataTypes.STRING,
      },
      customer_name_platform: {
        type: DataTypes.STRING,
      },
      platform_fee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      is_received_nps: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      order_date_utc_7: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'Order',
      tableName: 'order',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
}

export function wiringOrderTableRelations() {
  Order.belongsTo(PaymentMethod, {
    foreignKey: 'payment_method',
    targetKey: 'id',
    as: 'paymentMethod',
  });
}

export const orderResource: ResourceWithOptions = {
  resource: Order,
  options: {
    id: 'order',
    parent: 'Order',
    properties: {
      id: {
        isVisible: true,
        isId: true,
      },
      paymentMethod: {
        isVisible: true,
        isTitle: true,
        reference: `payment_method`,
      },
    },
    listProperties: [
      'id',
      'payment_method',
      'order_id',
      'order_date',
      'customer_name_platform',
      'outlet_id',
      'platform_id',
    ],
  },
};
