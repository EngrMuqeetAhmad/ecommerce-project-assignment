import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConnection';
import { ProductVariationDetailsTypes } from '../../types/ProductVariationDetailsJunction.types';
import { ProductVariation } from '../productVariation.model';
import { VariationTypeValueModel } from '../variantTypeValue.model';
export class ProductVariationDetails extends Model<
  ProductVariationDetailsTypes,
  ProductVariationDetailsTypes
> {
  public ID!: number;
  public variationTypeValue!: string;
  public variationID!: number;
}

ProductVariationDetails.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    variationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    variationTypeValue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'ProductVariationDetails',
    timestamps: false,
  },
);
