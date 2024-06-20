import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeOutlet } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentOutlet } from '../../admin/constants.js';

export class Outlet extends Model<InferAttributes<Outlet>, InferCreationAttributes<Outlet>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
  declare db_name: string | null;
  declare deleted_at: Date | null;
  declare full_name: string | null;
  declare address: string | null;
  declare create_date: Date | null;
  declare create_by: string | null;
  declare modified_date: Date | null;
  declare modified_by: string | null;
  declare ip_address_bill: string | null;
  declare print_kitchen_group: string | null;
  declare longitude: number | null;
  declare latitude: number | null;
  declare opening_hour: string;
  declare closing_hour: string;
  declare is_temporary_closed: boolean;
  declare address_detail: string | null;
  declare province: string | null;
  declare city: string | null;
  declare district: string | null;
  declare sub_district: string | null;
  declare zip_code: string | null;
  declare contact_name: string | null;
  declare contact_phone: string | null;
  declare grab_merchant_id: string | null;
  declare gofood_url: string | null;
  declare grabfood_url: string | null;
  declare shopeefood_url: string | null;
  declare travelokaeat_url: string | null;
  declare distance_threshold: number | null;
  declare coordinate_polygon: string | null;
  declare delivery_fee: number;
  declare printer_channel: string | null;
  declare printer_ip_kitchen: string | null;
  declare printer_ip_cashier: string | null;
  declare outlet_type: string | null;
}

export function setupOutletTable() {
  Outlet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      db_name: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      create_by: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      modified_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      modified_by: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      ip_address_bill: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      print_kitchen_group: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      opening_hour: {
        type: DataTypes.TIME,
        defaultValue: '08:00:00',
        allowNull: false,
      },
      closing_hour: {
        type: DataTypes.TIME,
        defaultValue: '23:59:59',
        allowNull: false,
      },
      is_temporary_closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      address_detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      sub_district: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      contact_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contact_phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      grab_merchant_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gofood_url: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      grabfood_url: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      shopeefood_url: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      travelokaeat_url: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      distance_threshold: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coordinate_polygon: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      delivery_fee: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      printer_channel: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      printer_ip_kitchen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      printer_ip_cashier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      outlet_type: {
        type: DataTypes.STRING,
        defaultValue: 'outlet',
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeOutlet,
      modelName: 'Outlet',
      tableName: 'outlet',
      timestamps: false,
    },
  );
}

export function wiringOutletTableRelations() {}

export const outletResource: ResourceWithOptions = {
  resource: Outlet,
  options: {
    id: 'Outlet',
    parent: parentOutlet,
    properties: {
      // listProperties: [],
    },
  },
};
