import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { ProductInput, ProductTypes } from '../types';
import { UserCart } from './userCart.model';
import { UserOrder } from './userOrder.model';
import { UserWish } from './userWish.model';
import { OrderProductJunction } from './junctionModels/OrderProduct.model';
import { CartProductJunction } from './junctionModels/CartProduct.model';

export class Product extends Model<ProductTypes, ProductInput> {
  public id!: number;
  public baseProductId!: number;
  public variationId!: number;
  public details!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    baseProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    variationId: {
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
////
Product.belongsToMany(UserCart, {
  through: CartProductJunction,
  foreignKey: {
    name: 'productId',
  },
});

UserCart.belongsToMany(Product, {
  through: CartProductJunction,
  foreignKey: {
    name: 'cartId',
  },
});
////
Product.belongsToMany(UserOrder, {
  through: OrderProductJunction,
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
});

UserOrder.belongsToMany(Product, {
  through: OrderProductJunction,
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
});
//////
Product.belongsToMany(UserWish, {
  through: 'WishProductJunction',
  foreignKey: {
    name: 'productId',
  },
});

UserWish.belongsToMany(Product, {
  through: 'WishProductJunction',
  foreignKey: {
    name: 'wishTableId',
  },
});
/////
