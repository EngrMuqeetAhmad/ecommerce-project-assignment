import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { OrderProductInput, OrderProductTypes } from '../../types';
export class OrderProductJunction extends Model<
  OrderProductTypes,
  OrderProductInput
> {
  public productID!: number;
  public orderID!: number;
  public userID!: number;
  public quantity!: number;
}

OrderProductJunction.init(
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
    orderID: {
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
    tableName: 'OrderProductJunction',
    timestamps: false,
  },
);
