import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection';

export const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,

      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'CategoryTable',
    timestamps: false,
    paranoid: true,
  },
);
