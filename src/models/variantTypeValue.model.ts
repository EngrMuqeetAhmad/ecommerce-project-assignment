import { DataTypes, Model } from 'sequelize';

import { ProductVariationDetails } from './junctionModels/ProductVariationDetails.model';
import { ProductVariation } from './productVariation.model';
import { VariationTypeModel } from './variantionType.models';
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
    tableName: 'VariationTypeValues',
  },
);
VariationTypeValueModel.hasMany(ProductVariationDetails, {
  foreignKey: 'variationTypeValue',
});

// VariationTypeValueModel.belongsTo(VariationTypeModel,{
//   foreignKey: "variationType",

// });

// VariationTypeValueModel.hasMany(ProductVariationDetails);
// ProductVariationDetails.belongsTo(VariationTypeValueModel);
