import { Association, DataTypes, Model } from 'sequelize';
import { OrderProductJunction } from './junctionModels/OrderProduct.model';
import { Product } from './product.model';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';
import { UserOrderInput, UserOrderTypes } from '../types';
import { STATUS } from '../utils/enum.util';

export class UserOrder extends Model<UserOrderTypes, UserOrderInput> {
  public ID!: number;
  public userID!: number;
  public status!: string;
  public paymentID!: string;
  public shippingAddressID!: number;
  public totalAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public products!: Array<{
    price: number;
    detials: string;
    baseProductID: number;
    info: {
      quantity: number;
    };
  }>;
  static associations: {
    products: Association<UserOrder, Product>;
  };
}

UserOrder.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [
          [
            STATUS.PENDING,
            STATUS.PROCESSING,
            STATUS.SHIPPED,
            STATUS.DELIEVERED,
          ],
        ],
      },
    },
    shippingAddressID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    paymentID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0.01,
      },
    },
  },

  {
    sequelize,
    tableName: 'UserOrderTable',
    timestamps: true,
    paranoid: true,
  },
);

UserOrder.belongsToMany(Product, {
  through: OrderProductJunction,
  as: 'products',
  onDelete: 'CASCADE',
});

//for product model
// Copy code
// Cart.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Cart deletes its Products
// });
