import { DataTypes, Model } from 'sequelize';

import { VariationTypeValueModel } from './variantTypeValue.model';
import { sequelize } from '../config/dbConnection';
import { VariationTypeTypes } from '../types/variantTypes.types';
export class VariationTypeModel extends Model<VariationTypeTypes> {
  public variationType!: string;
}

VariationTypeModel.init(
  {
    variationType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

VariationTypeModel.hasMany(VariationTypeValueModel, {
  foreignKey: 'variationType',
});
