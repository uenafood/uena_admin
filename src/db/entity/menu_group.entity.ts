import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeMenu } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentMenu } from '../../admin/constants.js';

export class MenuGroup extends Model<InferAttributes<MenuGroup>, InferCreationAttributes<MenuGroup>> {
  declare menu_group_id: CreationOptional<number>;
  declare name: string;
  declare thumbnail: string;
  declare create_date: Date;
  declare modified_date: Date;
  declare create_by: string;
  declare modified_by: string;
  declare deleted_at: Date | null;
  declare brand_id: number | null;
}

export function setupMenuGroupTable() {
  MenuGroup.init(
    {
      menu_group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
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
    },
    {
      sequelize: sequelizeMenu,
      modelName: 'MenuGroup',
      tableName: 'menu_group',
      timestamps: false,
    },
  );
}

export function wiringMenuGroupTableRelations() {}

export const menuGroupResource: ResourceWithOptions = {
  resource: MenuGroup,
  options: {
    id: 'menu-group',
    parent: parentMenu,
    properties: {
      // listProperties: [],
    },
  },
};
