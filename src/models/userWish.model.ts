import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { User } from './user.model';

export const UserWish = sequelize.define(
  'UserWish',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },

  {
    sequelize,
    tableName: 'UserWishTable',
    timestamps: true,
    paranoid: true,
  },
);

User.hasOne(UserWish, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
UserWish.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
