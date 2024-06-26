import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Association,
  NonAttribute,
} from 'sequelize';
import { sequelizeUENA } from '../config.js';
import { ActionRequest, ListActionResponse, RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { OutletTable } from './outlet-prod.entity.js';
import { PaymentMethodTable } from './payment_method.entity.js';
import { DeliveryMethodTable } from './delivery_method.entity.js';
import { CustomerTable } from './customer.entity.js';
import { VoidReasonTable } from './void_reason.entity.js';
import { CustomerAddressTable } from './customer_address.entity.js';
import { DriverTable } from './driver.entity.js';
import { Components } from '../../admin/component-loader.js';
import { MenuToOrderTable } from './menu_to_order.entity.js';
import { MenuTable } from './menu.entity.js';

/**
 * BASED ON db_uena.order
 */
export class OrderTable extends Model<InferAttributes<OrderTable>, InferCreationAttributes<OrderTable>> {
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

  declare menu?: NonAttribute<MenuTable>;
  // declare order

  declare static associations: {
    menu: Association<CustomerTable>;
  };
}

export function setupOrderTable() {
  OrderTable.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ref_code: {
        type: DataTypes.STRING,
        allowNull: true,
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
        defaultValue: 1,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'customer_id',
        },
      },
      customer_address_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
        allowNull: true,
      },
      is_source_app: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
        allowNull: true,
      },
      voucher_discount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: true,
      },
      voucher_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      delivery_fee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: true,
      },
      pb_fee: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      order_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nps_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nps_feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_big_order: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      courier_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finish_cooking_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      received_by_customer_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_void: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      void_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      void_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      app_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      driver_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outlet_alias: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_name_platform: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform_fee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: true,
      },
      is_received_nps: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      order_date_utc_7: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'Order',
      tableName: 'order',
      timestamps: false,
    },
  );
}

export function wiringOrderTableRelations() {
  OrderTable.belongsTo(OutletTable, {
    foreignKey: 'outlet_id',
    targetKey: 'id',
    as: 'outlet',
  });
  OrderTable.belongsTo(PaymentMethodTable, {
    foreignKey: 'payment_method',
    targetKey: 'id',
    as: 'payment',
  });
  OrderTable.belongsTo(DeliveryMethodTable, {
    foreignKey: 'delivery_method',
    targetKey: 'id',
    as: 'delivery',
  });
  OrderTable.belongsTo(CustomerTable, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id',
    as: 'customer',
  });
  OrderTable.belongsTo(VoidReasonTable, {
    foreignKey: 'void_category_id',
    targetKey: 'id',
    as: 'voidReason',
  });
  OrderTable.belongsTo(CustomerAddressTable, {
    foreignKey: 'customer_address_id',
    targetKey: 'customer_address_id',
    as: 'customerAddress',
  });
  OrderTable.belongsTo(DriverTable, {
    foreignKey: 'driver_id',
    targetKey: 'driver_id',
    as: 'driver',
  });
  OrderTable.hasMany(MenuToOrderTable, {
    foreignKey: 'order_id',
    sourceKey: 'order_id',
    as: 'menuToOrder',
  });
}

export const orderTableResource: ResourceWithOptions = {
  resource: OrderTable,
  options: {
    id: 'order',
    parent: 'Order',
    properties: {
      order_id: {
        type: 'string',
        isTitle: true,
      },
      phone: {
        type: 'string',
      },
      is_void: {
        type: 'boolean',
        components: {
          list: Components.Void,
        },
      },
      menuToOrder: {
        type: 'string',
        components: {
          list: Components.menuToOrder,
        },
      },
      delivery_method: {
        type: 'reference',
        components: {
          filter: Components.MultiSelect,
        },
        custom: {
          labelText: 'Delivery Method',
          /**
           * TODO: take from db delivery_method
           */
          availableValues: [
            {
              value: '1',
              label: 'Pick up',
            },
            {
              value: '2',
              label: 'Diantar oleh Driver',
            },
            {
              value: '3',
              label: 'GrabFood',
            },
            {
              value: '4',
              label: 'GoFood',
            },
            {
              value: '5',
              label: 'ShopeeFood',
            },
            {
              value: '6',
              label: 'Take Away',
            },
            {
              value: '7',
              label: 'Dine In',
            },
          ],
        },
      },
      voucher_code: {
        type: 'string',
        custom: {
          variant: 'primary',
        },
        components: {
          list: Components.SingleBadge,
          show: Components.SingleBadge,
        },
      },
      // total_payment: {
      //   type: 'number',
      //   custom: {
      //     variant: 'success',
      //   },
      //   components: {
      //     list: Components.SingleBadge,
      //     show: Components.SingleBadge,
      //   },
      // },
      cook_time: {
        type: 'string',
        components: {
          list: Components.DiffTime,
          show: Components.DiffTime,
        },
        custom: {
          type: 'cook',
          label: 'Cook Time',
        },
      },
      delivery_time: {
        type: 'string',
        components: {
          list: Components.DiffTime,
          show: Components.DiffTime,
        },
        custom: {
          type: 'delivery',
          label: 'Delivery Time',
        },
      },
      completion_time: {
        type: 'string',
        components: {
          list: Components.DiffTime,
          show: Components.DiffTime,
        },
        custom: {
          type: 'completion',
          label: 'Completion Time',
        },
      },
    },
    sort: {
      sortBy: 'order_date',
      direction: 'desc',
    },

    // disable create, edit, delete
    actions: {
      list: {
        after: async (response: ListActionResponse) => {
          const promises = response.records.map(async (record, index) => {
            const menuResult = await MenuToOrderTable.findAll({
              where: {
                order_id: record.params.id,
              },
            });
            record.params.menuToOrder = '';
            menuResult.forEach((item) => {
              record.params.menuToOrder += item.dataValues.menu_name + ', ';
            });
            record.params.phone = record.populated?.customer_id?.params.phone_number;
          });
          await Promise.all(promises);
          return response;
        },
      },
      search: {
        /**
         * TODO: Custom search by phone
         */
        // before: async (request: ActionRequest) => {
        //   const newQuery = {
        //     ['filters.phone']: 'test',
        //   };
        //   delete newQuery['filters.phone'];
        //   request.query = newQuery;
        //   return request;
        // },
      },
      show: {
        after: async (response: RecordActionResponse) => {
          const result = await MenuToOrderTable.findAll({
            where: {
              order_id: response?.record?.params?.id,
            },
          });
          response.record.params.phone = response.record.populated?.customer_id?.params.phone_number;
          response.record.params.menuToOrder = '';
          result.forEach((item) => {
            console.log('item', item.dataValues.menu_name);
            if (
              item.dataValues.menu_name !== 'undefined' ||
              item.dataValues.menu_name !== null ||
              item.dataValues.menu_name !== ''
            ) {
              response.record.params.menuToOrder += item.dataValues.menu_name + ', ';
            }
          });
          return response;
        },
      },
      new: {
        isAccessible: false,
      },
      edit: {
        isAccessible: false,
      },
      delete: {
        isAccessible: false,
      },
    },
    listProperties: [
      'id',
      'order_date',
      'delivery_method',
      'payment_method',
      'outlet_id',
      'customer_name_platform',
      'order_id',
      'app_status',
      'order_notes',
      'is_void',
      'phone',
      'menuToOrder',
      'voucher_code',
      'total_payment',
      'cook_time',
      'driver_id',
      'delivery_time',
      'completion_time',
      'received_by_customer_date',
      'finish_cooking_date',
    ],
    filterProperties: [
      'id',
      'order_id',
      'order_date',
      'is_void',
      'delivery_method',
      'payment_method',
      'outlet_id',
      'customer_name_platform',
      // 'phone',
      'voucher_code',
      'driver_id',
    ],
  },
};
