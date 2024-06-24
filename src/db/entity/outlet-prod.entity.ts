import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeOutlet } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentOutlet } from '../../admin/constants.js';

export class OutletTable extends Model<InferAttributes<OutletTable>, InferCreationAttributes<OutletTable>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
  declare db_name: string;
  declare deleted_at: Date;
  declare full_name: string;
  declare address: string;
  declare create_date: Date;
  declare create_by: string;
  declare modified_date: Date;
  declare modified_by: string;
  declare ip_address_bill: string;
  declare print_kitchen_group: string;
  declare longitude: number;
  declare latitude: number;
  declare opening_hour: Date;
  declare closing_hour: Date;
  declare is_temporary_closed: boolean;
  declare address_detail: string;
  declare province: string;
  declare city: string;
  declare district: string;
  declare sub_district: string;
  declare zip_code: string;
  declare contact_name: string;
  declare contact_phone: string;
  declare grab_merchant_id: string;
  declare gofood_url: string;
  declare grabfood_url: string;
  declare shopeefood_url: string;
  declare travelokaeat_url: string;
  declare distance_threshold: number;
  declare coordinate_polygon: string;
  declare delivery_fee: number;
  declare outlet_type: string;
}

export function setupOutletTable() {
  OutletTable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

export const outletTableResource: ResourceWithOptions = {
  resource: OutletTable,
  options: {
    id: 'outlet',
    parent: parentOutlet,
    properties: {
      name: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
