import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';

export const UserCart = sequelize.define(
  'UserCart',
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },

  {
    sequelize,
    tableName: 'UserCartTable',
    timestamps: true,
    paranoid: true,
  },
);

User.hasOne(UserCart, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
UserCart.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
