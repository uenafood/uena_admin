import { DataTypes, InferAttributes, InferCreationAttributes, Model, json } from 'sequelize';

import { sequelizeMenu } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { MenuCategoryTable } from './menu_category.entity.js';
import { Components } from '../../admin/component-loader.js';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class MenuTable extends Model<InferAttributes<MenuTable>, InferCreationAttributes<MenuTable>> {
  declare menu_id: number;
  declare menu_name: string;
  declare kitchen_name: string;
  declare bill_name: string;
  declare default_price: number;
  declare menu_category_id: number;
  declare image_path: string;
  declare cooking_time: number;
  declare max_cooking_time: number;
  declare create_date: Date;
  declare modified_date: Date;
  declare create_by: string;
  declare modified_by: string;
  declare deleted_at: Date | null;
  declare description: string | null;
  declare is_recommendation: boolean;
  declare brand_id: number | null;
  declare tags: string | null;
  declare stock_limit: number;
  declare weight: number;
  declare dimension: number;
  declare position: number | null;
  declare components: string[] | null;
  declare platform_fee: number | null;
  declare menu_combine: number[] | null;
  declare is_shown_to_pos: boolean | null;
}

export function setupMenuTable() {
  MenuTable.init(
    {
      menu_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      default_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      menu_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cooking_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_cooking_time: {
        type: DataTypes.INTEGER,
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_recommendation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      stock_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false,
      },
      dimension: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      components: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform_fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      menu_combine: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: true,
      },
      is_shown_to_pos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeMenu,
      tableName: 'menu',
      modelName: 'Menu',
      createdAt: false,
      updatedAt: false,
    },
  );
}

export const menuTableResource: ResourceWithOptions = {
  resource: MenuTable,
  features: [disableAllActions()],
  options: {
    id: 'menu',
    parent: 'Menu',
    properties: {
      menu_name: {
        type: 'string',
        isTitle: true,
      },
      components: {
        type: 'string',
        components: {},
      },
    },

    listProperties: [
      'menu_id',
      'menu_name',
      'kitchen_name',
      'bill_name',
      'default_price',
      'menu_category_id',
      'description',
      'components',
    ],
  },
};

export function wiringMenuTableRelations() {
  MenuTable.belongsTo(MenuCategoryTable, {
    foreignKey: 'menu_category_id',
    targetKey: 'menu_category_id',
    as: 'menuCategoryId',
  });
}
