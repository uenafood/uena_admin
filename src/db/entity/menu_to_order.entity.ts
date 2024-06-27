import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';
import { OrderTable } from './order.entity.js';
import { MenuTable } from './menu.entity.js';
import { disableAllActions } from '../../admin/features/disableAllActions.js';

export class MenuToOrderTable extends Model<
  InferAttributes<MenuToOrderTable>,
  InferCreationAttributes<MenuToOrderTable>
> {
  declare menu_to_order_id: number;
  declare menu_id: number;
  declare order_id: number;
  declare quantity: number;
  declare menu_name: string | null;
  declare notes: string | null;
}

export function setupMenuToOrderTable() {
  MenuToOrderTable.init(
    {
      menu_to_order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      menu_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      menu_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'MenuToOrder',
      tableName: 'menu_to_order',
      schema: 'public',
      timestamps: false,
    },
  );
}

export function wiringMenuToOrderTableRelations() {
  MenuToOrderTable.belongsTo(OrderTable, {
    foreignKey: 'order_id',
  });
  MenuToOrderTable.belongsTo(MenuTable, {
    foreignKey: 'menu_id',
  });
}

export const menuToOrderTableResource: ResourceWithOptions = {
  resource: MenuToOrderTable,
  features: [disableAllActions()],
  options: {
    id: 'menu_to_order',
    parent: 'Menu',
    properties: {
      menu_name: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
