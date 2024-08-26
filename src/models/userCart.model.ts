import { DataTypes, Model } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';
import { UserCartInput, UserCartTypes } from '../types';
import { Product } from './product.model';
import { CartProductJunction } from './junctionModels/cartProduct.model';
export class UserCart extends Model<UserCartTypes, UserCartInput> {
  public ID!: number;
  public userID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  //association for products
}

UserCart.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'UserCartTable',
    timestamps: true,
    paranoid: true,
  },
);

UserCart.belongsToMany(Product, {
  through: CartProductJunction,
});
///create specific variation product in database and then relate to cart

//for product model
// Copy code
// Cart.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Cart deletes its Products
// });
