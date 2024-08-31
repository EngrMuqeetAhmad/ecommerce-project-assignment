export interface NavCategoriesTypes {
  data: Array<CategoryType>;
}

export interface CategoryType {
  name: string;
  subCategories: Array<SubCategoryType>;
}

export interface SubCategoryType {
  name: string;
}
