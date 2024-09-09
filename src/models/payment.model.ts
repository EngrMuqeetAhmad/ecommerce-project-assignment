import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { PaymentInput, PaymentTypes } from '../types';

export class Payment extends Model<PaymentTypes, PaymentInput> {
  public ID!: number;
  public userID!: number;
  public paymentMethodID!: string;
  public cardNumber!: number;
  public fullName!: string;
  public expMonth!: number;
  public expYear!: number;
  public lastFour!: number;
  public cvc!: number;
}

Payment.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    paymentMethodID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cardNumber: {
      type: DataTypes.DECIMAL(16, 0),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        // len: [16, 16],
        // isCreditCard: true,
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expMonth: {
      type: DataTypes.DECIMAL(2, 0),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        len: [2, 2],
      },
    },
    expYear: {
      type: DataTypes.DECIMAL(4, 0),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        len: [4, 4],
      },
    },
    lastFour: {
      type: DataTypes.DECIMAL(4, 0),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        // len: [4, 4],
      },
    },
    cvc: {
      type: DataTypes.DECIMAL(3, 0),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        len: [3, 3],
      },
    },
  },
  {
    sequelize,
    tableName: 'PaymentInfoTable',
    timestamps: false,
    paranoid: true,
  },
);
