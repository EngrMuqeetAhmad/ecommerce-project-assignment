import { Optional } from 'sequelize';

export interface SubCategoryTypes {
  ID: number;
  subCategory: string;
}

export interface SubCategoryInput extends Optional<SubCategoryTypes, 'ID'> {}

export interface SubCategoryOutput extends Optional<SubCategoryTypes, 'ID'> {}
