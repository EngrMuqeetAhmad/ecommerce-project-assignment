import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { VariationTypeTypes } from '../types/variantTypes.types';
import { VariationTypeValueModel } from './variantTypeValue.model';
export class VariationTypeModel extends Model<VariationTypeTypes> {
  public variationType!: string;
}

VariationTypeModel.init(
  {
    variationType: {
      type: DataTypes.STRING,
      unique: true,
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

VariationTypeModel.hasMany(VariationTypeValueModel, {
  foreignKey: 'variationType',
  as: 'values',
});
