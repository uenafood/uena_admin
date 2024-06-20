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
import { ActionRequest, ResourceWithOptions } from 'adminjs';
import { parentMenu } from '../../admin/constants.js';
import { MenuGroup } from './menu_group.entity.js';
import { MenuGroupOutlet } from './menu_group_outlet.entity.js';
import { Menu } from './menu.entity.js';

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

  declare menuGroupOutlet: NonAttribute<MenuGroupOutlet>;

  declare static associations: {
    menuGroupOutlet: Association<MenuOutlet, MenuGroupOutlet>;
  };
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

export function wiringMenuOutletTableRelations() {
  MenuOutlet.belongsTo(MenuGroupOutlet, {
    foreignKey: 'menu_group_outlet_id',
    targetKey: 'menu_group_outlet_id',
    as: 'menuGroupOutlet',
  });
  MenuOutlet.belongsTo(Menu, {
    foreignKey: 'menu_id',
    targetKey: 'menu_id',
    as: 'menuId',
  });
  // MenuOutlet.belongsToMany(MenuGroup, {
  //   through: MenuGroupOutlet,
  //   foreignKey: 'menu_outlet_id',
  //   otherKey: 'menu_group_id',
  // });
}

export const menuOutletResource: ResourceWithOptions = {
  resource: MenuOutlet,
  options: {
    id: 'menu_outlet',
    parent: parentMenu,
    properties: {
      menuGroupOutlet: {
        isVisible: true,
        isTitle: true,
        reference: 'menu_group_outlet_id',
      },
    },
    listProperties: ['menu_id', 'menu_group_outlet_id', 'price', 'menu_name', 'position', 'is_available', 'deleted_at'],
    editProperties: ['menu_id', 'menu_group_outlet_id', 'price', 'menu_name', 'position', 'is_available', 'deleted_at'],
    actions: {
      new: {
        before: async (request: ActionRequest) => {
          if (request.payload?.menu_group_outlet_id) {
            const menuGroupOutletId = request.payload.menu_group_outlet_id;
            // find menu group outlet by id
            const menuGroupOutlet = await MenuGroupOutlet.findByPk(menuGroupOutletId);
            console.log('menuGroupOutlet', menuGroupOutlet);
            if (menuGroupOutlet) {
              const menuGroup = await MenuGroup.findByPk(menuGroupOutlet.menu_group_id);
              console.log('menuGroup', menuGroup);
              if (menuGroup) {
                request.payload.position = menuGroup.name;
              }
            }
          }
          return request;
        },
      },
    },
  },
};
