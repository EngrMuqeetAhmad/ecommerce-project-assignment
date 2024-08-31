import { DataTypes, Model } from 'sequelize';
import { ProductVariationDetails } from './junctionModels/ProductVariationDetails.model';
import { Reviews } from './review.model';
// import { VariationTypeValueModel } from './variantTypeValue.model';
import { VariationTypeValueModel } from './variantTypeValue.model';
import { VariationImage } from './variationImage.model';
import { sequelize } from '../config/dbConnection';
import { ProductVariationInput, ProductVariationTypes } from '../types';
export class ProductVariation extends Model<
  ProductVariationTypes,
  ProductVariationInput
> {
  public ID!: number;
  public productID!: number;
  public stockQuantity!: number;
  public additionPrice!: number;

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

// ProductVariation.belongsToMany(VariationTypeValueModel, {
//   through: 'ProductVariationDetails',
// });

// ProductVariation.hasMany(ProductVariationDetails);
// ProductVariationDetails.belongsTo(ProductVariation);

ProductVariation.hasMany(ProductVariationDetails, {
  foreignKey: 'variationID',
});

ProductVariation.hasMany(VariationImage, {
  foreignKey: 'variationID',
  as: 'images',
});

ProductVariation.hasMany(Reviews, {
  foreignKey: 'variationID',
  as: 'reviews',
});
