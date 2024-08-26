import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
export class WishProductJunction extends Model {
  public productID!: number;
  public wishTableID!: number;
  public userID!: number;
}

WishProductJunction.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wishTableID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
    tableName: 'WishProductJunction',
    timestamps: false,
  },
);
