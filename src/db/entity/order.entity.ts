import { Model, DataTypes, Optional } from 'sequelize';

import { sequelizeOrder } from '../config.js';

interface IOrder {
  id: number;
  order_date: Date;
  ref_code: string;
  delivery_method: number;
  payment_method: number;
  customer_id: number;
  customer_address_id: number;
  is_already_paid: boolean;
  outlet_id: number;
  outlet_group: string;
  is_source_app: boolean;
  total_payment: number;
  sub_total: number;
  point_used: number;
  voucher_discount: number;
  voucher_code: string;
  delivery_fee: number;
  pb_fee: number;
  order_notes: string;
  nps_score: number;
  nps_feedback: string;
  is_big_order: boolean;
  courier_code: string;
  finish_cooking_date: Date;
  received_by_customer_date: Date;
  is_void: boolean;
  void_category_id: number;
  void_reason: string;
  app_status: string;
  driver_id: string;
  order_id: string;
  outlet_alias: string;
  platform_id: string;
  customer_name_platform: string;
  platform_fee: number;
  is_received_nps: boolean;
  order_date_utc_7: Date;
}

export type OrderCreationAttributes = Optional<IOrder, 'id'>;

export class Order extends Model<IOrder, OrderCreationAttributes> {
  declare id: number;

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
}

export const orderShowProperties = {
  id: {
    type: 'number',
    isVisible: {
      list: true,
      edit: true,
      filter: false,
      show: false,
    },
  },
};

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
    sequelize: sequelizeOrder,
    modelName: 'Order',
    tableName: 'order',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
