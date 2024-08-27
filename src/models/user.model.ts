import { Association, DataTypes, Model } from 'sequelize';
import { PhoneInfo } from './phoneInfo.model';
import { ShippingAddress } from './shippingAddress.model';
import { UserCart } from './userCart.model';
import { UserOrder } from './userOrder.model';
import { sequelize } from '../config/dbConnection';
import { UserInput, UserTypes } from '../types/user.types';
import { hashString } from '../utils/passwordHashednSalated';
import { Reviews } from './review.model';
import { UserWish } from './userWish.model';
import { Payment } from './payment.model';

export class User extends Model<UserTypes, UserInput> {
  public ID!: number;
  public firstName!: string;
  public secondName!: string;
  public email!: string;
  public role!: string;
  public isVerified!: boolean;
  public stripeID!: string;
  public cartID!: number;
  public wishTableID!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  private password!: string;

  //Associaiton

  public readonly phoneNumbers!: PhoneInfo[];
  public readonly userCart!: UserCart;
  public readonly shippingAdresses!: ShippingAddress[];
  public readonly userOrder!: UserOrder[];
  public static association: {
    phoneNumbers: Association<User, PhoneInfo>;
    userCart: Association<User, UserCart>;
    shippingAdresses: Association<User, ShippingAddress>;
    userOrder: Association<User, UserOrder>;
  };
}

User.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    wishTableID: {
      type: DataTypes.INTEGER,
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

User.hasMany(PhoneInfo, {
  as: 'phoneNumbers',
  foreignKey: 'userID',
});

User.hasOne(UserCart, {
  as: 'userCart',
  foreignKey: 'userID',
});
User.hasOne(UserWish, {
  as: 'userWish',
  foreignKey: 'userID',
});

User.hasMany(ShippingAddress, {
  as: 'userAddresses',
  foreignKey: 'userID',
});

User.hasMany(UserOrder, {
  as: 'userOrder',
  foreignKey: 'userID',
});

User.hasMany(Reviews, {
  foreignKey: 'userID',
  as: 'reviewsGiven',
});

User.hasMany(Payment, {
  foreignKey: 'userID',
  as: 'paymentMethods',
});
