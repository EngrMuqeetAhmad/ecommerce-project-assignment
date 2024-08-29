import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { CartProduct, CartProductInput } from '../../types';
export class CartProductJunction extends Model<CartProduct, CartProductInput> {
  public ID!: number;
  public productID!: number;
  public cartID!: number;
  public userID!: number;
  public quantity!: number;
}

CartProductJunction.init(
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
    cartID: {
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
    tableName: 'CartProductJunction',
    timestamps: false,
  },
);
