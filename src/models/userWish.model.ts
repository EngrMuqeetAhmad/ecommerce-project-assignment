import { DataTypes, Model } from 'sequelize';
import { WishProductJunction } from './junctionModels/WishProduct.model';
import { Product } from './product.model';
import { sequelize } from '../config/dbConnection';
import { UserWishInput, UserWishTypes } from '../types';

export class UserWish extends Model<UserWishTypes, UserWishInput> {
  public ID!: number;
  public userID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  //association for products
}

UserWish.init(
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
    tableName: 'UserWishTable',
    timestamps: true,
    paranoid: true,
  },
);

UserWish.belongsToMany(Product, {
  through: WishProductJunction,
});

///create specific variation product in database and then relate to cart

//for product model
// Copy code
// Wish.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Wish deletes its Products
// });
