import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { ProductVariation } from '../productVariation.model';
import { VariationTypeValueModel } from '../variantTypeValue.model';

export const ProductVariationDetails = sequelize.define(
  'ProductVariationDetails',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'ProductVariationDetails',
    timestamps: false,
  },
);

