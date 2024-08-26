import { DataTypes, Model } from 'sequelize';
import { ProductVariationInput, ProductVariationTypes } from '../types';
import { sequelize } from '../config/dbConnection';
import { VariationTypeValueModel } from './variantTypeValue.model';
import { VariationImage } from './variationImage.model';
import { Reviews } from './review.model';
export class ProductVariation extends Model<
  ProductVariationTypes,
  ProductVariationInput
> {
  public ID!: number;
  public productID!: number;
  public stockQuantity!: number;
  public additionalPrice!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ProductVariation.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stockQuantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
      },
    },
    additionPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'productVariationTable',
    timestamps: true,
    paranoid: true,
  },
);

ProductVariation.belongsToMany(VariationTypeValueModel, {
  through: 'ProductVariationDetails',
});

ProductVariation.hasMany(VariationImage, {
  foreignKey: 'variationID',
  as: 'images',
});

ProductVariation.hasMany(Reviews, {
  foreignKey: 'variationID',
  as: 'reviews',
});
