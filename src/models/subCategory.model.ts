import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { Category } from './category.model';


export const SubCategory = sequelize.define(
  'SubCategory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subCategory: {
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
    tableName: 'SubCategoryTable',
    timestamps: false,
    paranoid: true,
  },
);
Category.hasMany(SubCategory, {
  foreignKey: {
    allowNull: false,
    name: 'categoryId',
  },
});
SubCategory.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: 'categoryId',
  },
});
