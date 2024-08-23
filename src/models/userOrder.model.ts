import { DataTypes, Model } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';
import { UserOrderInput, UserOrderTypes } from '../types';
import { STATUS } from '../types/userOrder.types';

export class UserOrder extends Model<UserOrderTypes, UserOrderInput> {
  public ID!: number;
  public userID!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
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
  },

  {
    sequelize,
    tableName: 'UserOrderTable',
    timestamps: true,
    paranoid: true,
  },
);

//for product model
// Copy code
// Cart.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Cart deletes its Products
// });
