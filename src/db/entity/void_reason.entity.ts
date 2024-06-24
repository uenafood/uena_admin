import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeUENA } from '../config.js';
import { ResourceWithOptions } from 'adminjs';

export class VoidReasonTable extends Model<InferAttributes<VoidReasonTable>, InferCreationAttributes<VoidReasonTable>> {
  declare id: CreationOptional<number>;
  declare reason: string;
}

export function setupVoidReasonTable() {
  VoidReasonTable.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeUENA,
      modelName: 'VoidReason',
      tableName: 'void_reason_category',
      timestamps: false,
    },
  );
}

export function wiringVoidReasonTableRelations() {}

export const voidReasonTableResource: ResourceWithOptions = {
  resource: VoidReasonTable,
  options: {
    id: 'void_reason_category',
    parent: 'Order',
    properties: {
      reason: {
        type: 'string',
        isTitle: true,
      },
    },
  },
};
