import { DataTypes, Model } from 'sequelize';
import { ProductVariation } from './productVariation.model';
import { sequelize } from '../config/dbConnection';
import { BaseProductInput, BaseProductTypes } from '../types';

export class BaseProduct extends Model<BaseProductTypes, BaseProductInput> {
  public ID!: number;
  public title!: string;
  public description!: string;
  public basePrice!: number;
  public subCategory!: string;
  public brand!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

BaseProduct.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'BaseProductTable',
    timestamps: true,
    paranoid: true,
  },
);

BaseProduct.hasMany(ProductVariation, {
  foreignKey: 'productID',
  as: 'variations',
  onDelete: 'CASCADE',
});
