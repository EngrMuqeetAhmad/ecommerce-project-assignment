import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConnection';
import { UserInput, UserTypes } from '../types/user.types';
import { hashString } from '../utils/passwordHashednSalated';

class User extends Model<UserTypes, UserInput> {
  public ID!: number;
  public firstName!: string;
  public secondName!: string;
  public email!: string;
  public role!: string;
  public isVerified!: boolean;
  public stripeID!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  private password!: string;
}

User.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(this: Model, value: string) {
        this.setDataValue('password', hashString(value));
      },
      validate: {
        min: 6,
        notEmpty: true,
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['admin', 'user']],
      },
    },
    stripeID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'UserTable',
    timestamps: true,
    paranoid: true,
  },
);

export default User;
