import { DataTypes, Model } from 'sequelize';
import { UserCartInput, UserCartTypes } from '../types';
import { sequelize } from '../config/dbConnection';
import User from './user.model';
export class UserCart extends Model<UserCartTypes, UserCartInput> {
  public ID!: number;
  public userID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserCart.init(
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
  },

  {
    sequelize,
    tableName: 'UserCartTable',
    timestamps: true,
    paranoid: true,
  },
);

UserCart.belongsTo(User, {
  as: 'userCart',
  foreignKey: 'userID',
});


