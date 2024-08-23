import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { CategoryInput, CategoryTypes } from '../types';
export class Category extends Model<CategoryTypes, CategoryInput> {
  public ID!: number;
  public category!: string;
}

Category.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'CategoryTable',
    timestamps: false,
    paranoid: true,
  },
);

///create specific variation product in database and then relate to cart

//for product model
// Copy code
// Wish.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Wish deletes its Products
// });
