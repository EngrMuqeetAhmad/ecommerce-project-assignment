import { DataTypes, Model } from 'sequelize';

import { ProductVariation } from './productVariation.model';
import { sequelize } from '../config/dbConnection';
import { VariationTypeValueTypes } from '../types/variantTypeValue.types';

export class VariationTypeValueModel extends Model<VariationTypeValueTypes> {
  public variationType!: string;
  public variationTypeValue!: string;
}

VariationTypeValueModel.init(
  {
    variationTypeValue: {
      type: DataTypes.STRING,

      unique: true,
      allowNull: false,
      primaryKey: true,

      validate: {
        notEmpty: true,
      },
    },
    variationType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'VariationTypes',
  },
);

// VariationTypeValueModel.belongsToMany(ProductVariation, {
//   through: 'ProductVariationDetails',
// });
