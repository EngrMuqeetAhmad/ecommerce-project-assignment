import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';

export const OrderProductJunction = sequelize.define(
  'OrderProductJunction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
  },
  {
    sequelize,
    tableName: 'OrderProductJunction',
    timestamps: false,
  },
);
