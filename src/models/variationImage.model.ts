import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import {
  ProductVariationImgInput,
  ProductVariationImgTypes,
} from '../types/productImages.types';

export class VariationImage extends Model<
  ProductVariationImgTypes,
  ProductVariationImgInput
> {
  public ID!: number;
  public path!: string;
  public variationID!: number;
}

VariationImage.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    variationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  {
    sequelize,
    tableName: 'VariationImagesTable',
    timestamps: false
  },
);
