import { DataTypes } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import { User } from './user.model';

export const Payment = sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    paymentMethodId: {
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

User.hasMany(Payment, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Payment.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
