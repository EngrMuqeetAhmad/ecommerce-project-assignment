import { DataTypes, Model } from 'sequelize';
import { BaseProductInput, BaseProductTypes } from '../types';
import { sequelize } from '../config/dbConnection';
import { ProductVariation } from './productVariation.model';

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
    tableName: 'baseProductTable',
    timestamps: true,
    paranoid: true,
  },
);

BaseProduct.hasMany(ProductVariation, {
  foreignKey: 'productID',
  as: 'variants',
  onDelete: 'CASCADE',
});

// BaseProduct.hasMany(ProductTy)