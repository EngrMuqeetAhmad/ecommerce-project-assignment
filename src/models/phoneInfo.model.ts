import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { UserInput, UserTypes } from '../types/user.types';
import { hashString } from '../utils/passwordHashednSalated';
import { PhoneInfoInput, PhoneInfoTypes } from '../types/phoneInfo.types';

class PhoneInfo extends Model<PhoneInfoTypes, PhoneInfoInput> {
  public ID!: number;
  public userID!: number;
  public countryCode!: number;
  public phoneNumber!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

PhoneInfo.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    countryCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default PhoneInfo;
