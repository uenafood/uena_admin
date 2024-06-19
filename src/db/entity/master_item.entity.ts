import { DataTypes, Model, Optional } from 'sequelize';

import { sequelizeInventory } from '../config.js';

interface IMasterItem {
  id: number;
  item: string;
  small_unit: string;
  big_unit: string;
  categories: JSON;
}

export type MasterDataCreationAttributes = Optional<IMasterItem, 'id'>;

export class MasterItem extends Model<IMasterItem, MasterDataCreationAttributes> {
  declare id: number;

  declare name: string;

  declare small_unit: string;

  declare big_unit: string;

  declare categories: JSON;
}

MasterItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    small_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    big_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInventory,
    tableName: 'master_item',
    modelName: 'MasterItem',
    updatedAt: false,
    createdAt: false,
  },
);
