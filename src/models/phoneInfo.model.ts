import { Association, DataTypes, Model } from 'sequelize';
import { User } from './user.model';
import { sequelize } from '../config/dbConnection';
import { PhoneInfoInput, PhoneInfoTypes } from '../types/phoneInfo.types';
import { UserInput, UserTypes } from '../types/user.types';
import { hashString } from '../utils/passwordHashednSalated';

export class PhoneInfo extends Model<PhoneInfoTypes, PhoneInfoInput> {
  public ID!: number;
  public userID!: number;
  public countryCode!: number;
  public phoneNumber!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public readonly owner!: User;

  public static association: {
    owner: Association<PhoneInfo, User>;
  };
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
