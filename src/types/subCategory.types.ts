import { Optional } from 'sequelize';

export interface SubCategoryTypes {
  ID: number;
  subCategoryName: string;
  category: string
}

export interface SubCategoryInput extends Optional<SubCategoryTypes, 'ID'> {}

export interface SubCategoryOutput extends Optional<SubCategoryTypes, 'ID'> {}
