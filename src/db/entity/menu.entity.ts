import { DataTypes, Model } from 'sequelize';

import { sequelizeMenu } from '../config.js';

interface IMenu {
  menu_id: number;
  menu_name: string;
  kitchen_name: string;
  bill_name: string;
  default_price: number;
  menu_category_id: number;
  image_path: string;
  cooking_time: number;
  max_cooking_time: number;
  create_date: Date;
  modified_date: Date;
  create_by: string;
  modified_by: string;
  deleted_at: Date | null;
  description: string | null;
  is_recommendation: boolean;
  brand_id: number | null;
  tags: string | null;
  stock_limit: number;
  weight: number;
  dimension: number;
  position: number | null;
  components: string | null;
  platform_fee: number | null;
  menu_combine: number[] | null;
  is_shown_to_pos: boolean | null;
}

export class Menu extends Model<IMenu> {}

Menu.init(
  {
    menu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    menu_name: { type: DataTypes.STRING(100), allowNull: false },
    kitchen_name: { type: DataTypes.STRING(100), allowNull: false },
    bill_name: { type: DataTypes.STRING(100), allowNull: false },
    default_price: { type: DataTypes.FLOAT, allowNull: false },
    menu_category_id: { type: DataTypes.INTEGER, allowNull: false },
    image_path: { type: DataTypes.STRING(255), allowNull: false },
    cooking_time: { type: DataTypes.INTEGER, allowNull: false },
    max_cooking_time: { type: DataTypes.INTEGER, allowNull: false },
    create_date: { type: DataTypes.DATE, allowNull: false },
    modified_date: { type: DataTypes.DATE, allowNull: false },
    create_by: { type: DataTypes.STRING(255), allowNull: false },
    modified_by: { type: DataTypes.STRING(255), allowNull: false },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    is_recommendation: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    brand_id: { type: DataTypes.INTEGER, allowNull: true },
    tags: { type: DataTypes.STRING(255), allowNull: true },
    stock_limit: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    weight: { type: DataTypes.FLOAT, defaultValue: 0.0, allowNull: false },
    dimension: { type: DataTypes.FLOAT, defaultValue: 0.0, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: true },
    components: { type: DataTypes.STRING, allowNull: true },
    platform_fee: { type: DataTypes.FLOAT, allowNull: true },
    menu_combine: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [], allowNull: true },
    is_shown_to_pos: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
  },
  {
    sequelize: sequelizeMenu,
    tableName: 'menu',
    modelName: 'Menu',
    createdAt: false,
    updatedAt: false,
  },
);
