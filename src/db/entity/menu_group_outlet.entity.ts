import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Association,
} from 'sequelize';
import { sequelizeMenu } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { parentMenu } from '../../admin/constants.js';
import { MenuGroup } from './menu_group.entity.js';

export class MenuGroupOutlet extends Model<InferAttributes<MenuGroupOutlet>, InferCreationAttributes<MenuGroupOutlet>> {
  declare menu_group_outlet_id: CreationOptional<number>;
  declare menu_group_id: number;
  declare position: number;
  declare outlet_id: number;
  declare is_visible: boolean;
  declare create_date: Date;
  declare modified_date: Date;
  declare create_by: string;
  declare modified_by: string;
  declare deleted_at: Date | null; // nullable

  declare menuGroup: NonAttribute<MenuGroup>;

  declare static associations: {
    menuGroup: Association<MenuGroupOutlet, MenuGroup>;
  };
}

export function setupMenuGroupOutletTable() {
  MenuGroupOutlet.init(
    {
      menu_group_outlet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      outlet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
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
    },
    {
      sequelize: sequelizeMenu,
      modelName: 'MenuGroupOutlet',
      tableName: 'menu_group_outlet',
      timestamps: false,
    },
  );
}

export function wiringMenuGroupOutletTableRelations() {
  MenuGroupOutlet.belongsTo(MenuGroup, {
    foreignKey: 'menu_group_id',
    targetKey: 'menu_group_id',
    as: 'menuGroup',
  });
}

export const menuGroupOutletResource: ResourceWithOptions = {
  resource: MenuGroupOutlet,
  options: {
    id: 'menu_group_outlet',
    parent: parentMenu,
    properties: {
      // listProperties: [],
    },
  },
};
