import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';

export const ShippingAddress = sequelize.define(
  'ShippingAddress',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,

      primaryKey: true,
    },

    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'ShippingAddressTable',
    timestamps: true,
    paranoid: true,
  },
);

User.hasMany(ShippingAddress, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

ShippingAddress.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
