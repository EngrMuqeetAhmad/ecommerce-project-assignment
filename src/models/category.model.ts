import { DataTypes, Model } from 'sequelize';
import { SubCategory } from './subCategory.model';
import { sequelize } from '../config/dbConnection';
import { CategoryInput, CategoryTypes } from '../types';
export class Category extends Model<CategoryTypes, CategoryInput> {
  public category!: string;
}

Category.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

Category.hasMany(SubCategory, {
  foreignKey: 'category',
  as: 'subCategories',
  // onDelete: 'CASCADE',
});

///create specific variation product in database and then relate to cart

//for product model
// Copy code
// Wish.hasMany(Product, {
//   foreignKey: 'cartId',
//   as: 'products',
//   onDelete: 'CASCADE', // This ensures that deleting a Wish deletes its Products
// });
