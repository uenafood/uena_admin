import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelizeMenu } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentMenu } from '../../admin/constants.js';

export class MenuCategory extends Model<InferAttributes<MenuCategory>, InferCreationAttributes<MenuCategory>> {
  declare menu_category_id: CreationOptional<number>;
  declare name: string;
  declare create_date: Date;
  declare modified_date: Date;
  declare create_by: string;
  declare modified_by: string;
  declare deleted_at: Date | null;
  declare brand_id: number | null;
  declare position: number | null;
  declare name_form: string | null;
}

export function setupMenuCategoryTable() {
  MenuCategory.init(
    {
      menu_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
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
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name_form: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeMenu,
      modelName: 'MenuCategory',
      tableName: 'menu_category',
      timestamps: false,
    },
  );
}

export function wiringMenuCategory() {}

export const menuCategoryResource: ResourceWithOptions = {
  resource: MenuCategory,
  options: {
    id: 'menu_category',
    parent: parentMenu,
    properties: {
      name: {
        type: 'string',
        isTitle: true,
      },
      // listProperties: [],
    },
  },
};
