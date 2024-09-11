import { DataTypes } from 'sequelize';

import { VariationTypeModel } from './variantionType.models';
import { sequelize } from '../config/dbConnection';
import { ProductVariation } from './productVariation.model';

export const VariationTypeValueModel = sequelize.define(
  'VariationTypeValueModel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    variationTypeValue: {
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

VariationTypeValueModel.belongsTo(VariationTypeModel, {
  foreignKey: {
    name: 'typeId',
    allowNull: false,
  },
});
VariationTypeModel.hasMany(VariationTypeValueModel, {
  foreignKey: {
    name: 'typeId',
    allowNull: false,
  },
});
//////
VariationTypeValueModel.belongsToMany(ProductVariation, {
  through: 'ProductVariationDetails',
  foreignKey: {
    name: 'typeValueId',
    allowNull: false,
  },
});

ProductVariation.belongsToMany(VariationTypeValueModel, {
  through: 'ProductVariationDetails',
  foreignKey: {
    name: 'variationId',
    allowNull: false,
  },
});
