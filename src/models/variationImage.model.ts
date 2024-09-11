import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { ProductVariation } from './productVariation.model';

export const VariationImage = sequelize.define(
  'VariationImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'VariationImagesTable',
    timestamps: false,
  },
);

VariationImage.belongsTo(ProductVariation, {
  foreignKey: {
    name: 'variationId',
    allowNull: false,
  },
});

ProductVariation.hasMany(VariationImage, {
  foreignKey: {
    name: 'variationId',
    allowNull: false,
  },
});
