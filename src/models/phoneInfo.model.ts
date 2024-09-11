import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';

export const PhoneInfo = sequelize.define(
  'PhoneInfo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    countryCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'PhoneInfoTable',
    timestamps: true,
    paranoid: true,
  },
);

User.hasMany(PhoneInfo, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

PhoneInfo.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
