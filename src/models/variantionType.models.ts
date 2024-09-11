import { DataTypes } from 'sequelize';

import { sequelize } from '../config/dbConnection';

export const VariationTypeModel = sequelize.define(
  'VariationTypeModel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
