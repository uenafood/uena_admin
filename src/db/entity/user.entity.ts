import { Model, DataTypes, Optional } from 'sequelize';

import { sequelizeUser } from '../config.js';

interface IUser {
  id: number;
  email: string;
  password: string;
}

export type AdminCreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, AdminCreationAttributes> {
  id: number;

  email: string;

  password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeUser,
    tableName: 'user',
    modelName: 'User',
    updatedAt: false,
    createdAt: false,
  },
);
