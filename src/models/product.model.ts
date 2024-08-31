import { DataTypes, Model } from 'sequelize';

import { CartProductJunction } from './junctionModels/CartProduct.model';
import { OrderProductJunction } from './junctionModels/OrderProduct.model';
import { WishProductJunction } from './junctionModels/WishProduct.model';
import { sequelize } from '../config/dbConnection';
import { DETAILS, ProductInput, ProductTypes } from '../types';

export class Product extends Model<ProductTypes, ProductInput> {
  public ID!: number;
  public baseProductID!: number;
  public variationID!: number;
  public details!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    baseProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    variationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },

      get() {
        const rawValue: any = this.getDataValue('details');
        return JSON.parse(rawValue);
      },

      set(value: any) {
        this.setDataValue('details', JSON.stringify(value));
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
  },
  {
    sequelize,
    tableName: 'ProductTable',
    timestamps: true,
    paranoid: true,
  },
);

Product.hasMany(CartProductJunction, {
  foreignKey: 'productID',
});

Product.hasMany(OrderProductJunction, {
  foreignKey: 'productID',
});

Product.hasMany(WishProductJunction, {
  foreignKey: 'productID',
});
