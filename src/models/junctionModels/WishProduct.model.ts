import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { WishProduct, WishProductInput } from '../../types';
export class WishProductJunction extends Model<WishProduct, WishProductInput> {
  public productID!: number;
  public wishTableID!: number;
  public userID!: number;
}

WishProductJunction.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wishTableID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userID: {
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
);
