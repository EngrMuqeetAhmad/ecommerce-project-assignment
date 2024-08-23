import { Association, DataTypes, Model } from 'sequelize';
import {
  ShippingAddressInput,
  ShippingAddressTypes,
} from '../types/shippingAddress.types';
import User from './user.model';
import { sequelize } from '../config/dbConnection';

export class ShippingAddress extends Model<
  ShippingAddressTypes,
  ShippingAddressInput
> {
  public ID!: number;
  public userID!: number;
  public addressLin1!: string;
  public addressLine2!: string;
  public region!: string;
  public city!: string;
  public country!: string;
  public postalCode!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public readonly owner!: User;

  public static association: {
    owner: Association<ShippingAddress, User>;
  };
}

ShippingAddress.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
     
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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

