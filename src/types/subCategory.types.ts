export interface SubCategoryTypes {
  id: number;
  subCategory: string;
  categoryId: number;
}

export interface SubCategoryInput extends Omit<SubCategoryTypes, 'id'> {}

export interface SubCategoryOutput extends Required<SubCategoryTypes> {}
