import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { STATUS } from '../utils/enum.util';
import { User } from './user.model';

export const UserOrder = sequelize.define(
  "UserOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [
          [
            STATUS.PENDING,
            STATUS.PROCESSING,
            STATUS.SHIPPED,
            STATUS.DELIEVERED,
          ],
        ],
      },
    },
    shippingAddressID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    paymentID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0.01,
      },
    },
  },

  {
    sequelize,
    tableName: 'UserOrderTable',
    timestamps: true,
    paranoid: true,
  },
)

User.hasMany(UserOrder, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
UserOrder.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
