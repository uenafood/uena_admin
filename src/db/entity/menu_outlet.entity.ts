import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeMenu } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentMenu } from '../../admin/constants.js';

export class MenuOutlet extends Model<InferAttributes<MenuOutlet>, InferCreationAttributes<MenuOutlet>> {
  declare menu_outlet_id: CreationOptional<number>;
  declare menu_id: number;
  declare menu_group_outlet_id: number;
  declare print_kitchen_outlet_id: number;
  declare price: number;
  declare menu_name: string;
  declare kitchen_name: string;
  declare bill_name: string;
  declare parent_id: number | null;
  declare type_menu: string | null;
  declare is_optional: boolean | null;
  declare is_visible: boolean | null;
  declare position: number | null;
  declare order_type: object;
  declare create_date: Date;
  declare modified_date: Date;
  declare create_by: string;
  declare modified_by: string;
  declare deleted_at: Date | null;
  declare info: string | null;
  declare is_available: boolean | null;
}

export function setupMenuOutletTable() {
  MenuOutlet.init(
    {
      menu_outlet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      menu_group_outlet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      print_kitchen_outlet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      menu_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      kitchen_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      bill_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_menu: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      is_optional: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order_type: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      modified_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      create_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      modified_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      info: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeMenu,
      modelName: 'MenuOutlet',
      tableName: 'menu_outlet',
      timestamps: false,
    },
  );
}

export function wiringMenuOutletTableRelations() {}

export const menuOutletResource: ResourceWithOptions = {
  resource: MenuOutlet,
  options: {
    id: 'menu-outlet',
    parent: parentMenu,
    properties: {
      // listProperties: [],
    },
  },
};
