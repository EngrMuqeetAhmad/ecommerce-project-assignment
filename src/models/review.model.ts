import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/dbConnection';
import {
  VariationReviewInput,
  VariationReviewTypes,
} from '../types/review.types';
import { RATING } from '../utils/enum.util';

export class Reviews extends Model<VariationReviewTypes, VariationReviewInput> {
  public ID!: number;
  public message!: string;
  public rating!: RATING;
  public userID!: number;
  public variationID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Reviews.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    rating: {
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
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'ReviewTable',
    timestamps: true,
  },
);
