import { DataTypes } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { BaseProduct } from './baseProduct.model';

export const ProductVariation = sequelize.define(
  'ProductVariation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    stockQuantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
    additionPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'productVariationTable',
    timestamps: true,
    paranoid: true,
  },
);

BaseProduct.hasMany(ProductVariation, {
  foreignKey: {
    allowNull: false,
    name: 'productId',
  },
});

ProductVariation.belongsTo(BaseProduct, {
  foreignKey: {
    allowNull: false,
    name: 'productId',
  },
});
