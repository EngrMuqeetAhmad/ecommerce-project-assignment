import { SubCategoryOutput } from './subCategory.types';

export interface CategoryTypes {
  id: number;
  category: string;
}

export interface CategoryInput extends Omit<CategoryTypes, 'id'> {}

export interface CategoryOutput extends Required<CategoryTypes> {}

export interface AssociatedSubCategory extends Required<CategoryTypes> {
  SubCategories?: Array<SubCategoryOutput>;
}
