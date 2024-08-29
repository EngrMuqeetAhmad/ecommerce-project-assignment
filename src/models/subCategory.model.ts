import { DataTypes, Model } from 'sequelize';
import { BaseProduct } from './baseProduct.model';
import { sequelize } from '../config/dbConnection';
import { SubCategoryInput, SubCategoryTypes } from '../types';
export class SubCategory extends Model<SubCategoryTypes, SubCategoryInput> {
  public subCategory!: string;
  public category!: string;
}

SubCategory.init(
  {
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
