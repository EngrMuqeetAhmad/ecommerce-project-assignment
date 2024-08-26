import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { SubCategoryInput, SubCategoryTypes } from '../types';
import { BaseProduct } from './baseProduct.model';
export class SubCategory extends Model<SubCategoryTypes, SubCategoryInput> {
  public ID!: number;
  public subCategoryName!: string;
  public category!: string;
}

SubCategory.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'SubCategoryTable',
    timestamps: false,
    paranoid: true,
  },
);

SubCategory.hasMany(BaseProduct, {
  foreignKey: 'subCategory',
  as: 'products',
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
