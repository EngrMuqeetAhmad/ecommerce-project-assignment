import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { WishProduct, WishProductInput } from '../../types';


export const WishProductJuction  = sequelize.define(
  "WishProductJuction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wishTableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
   
  },
  {
    sequelize,
    tableName: 'WishProductJunction',
    timestamps: false,
  },
)

