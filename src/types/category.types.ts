import { Optional } from 'sequelize';

export interface CategoryTypes {
  ID: number;
  category: string;
}

export interface CategoryInput extends Optional<CategoryTypes, 'ID'> {}

export interface CategoryOutput extends Optional<CategoryTypes, 'ID'> {}
