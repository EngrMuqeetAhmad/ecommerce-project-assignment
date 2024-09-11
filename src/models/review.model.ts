import { DataTypes } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { ProductVariation } from './productVariation.model';
import { User } from './user.model';

export const Reviews = sequelize.define(
  'Reviews',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'ReviewTable',
    timestamps: true,
  },
);
/////
Reviews.belongsTo(ProductVariation, {
  foreignKey: {
    name: 'variationId',
    allowNull: false,
  },
});

ProductVariation.hasMany(Reviews, {
  foreignKey: {
    name: 'variationId',
    allowNull: false,
  },
});
////
Reviews.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

User.hasMany(Reviews, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
