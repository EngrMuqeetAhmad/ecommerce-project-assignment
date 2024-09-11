import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { SubCategory } from './subCategory.model';

export const BaseProduct = sequelize.define(
  'BaseProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'BaseProductTable',
    timestamps: true,
    paranoid: true,
  },
);

SubCategory.hasMany(BaseProduct, {
  foreignKey: {
    allowNull: false,
    name: 'subCategoryId',
  },
});
BaseProduct.belongsTo(SubCategory, {
  foreignKey: {
    allowNull: false,
    name: 'subCategoryId',
  },
});
