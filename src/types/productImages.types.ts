
export interface ProductVariationImgTypes {
  id: number;
  path: string;
  variationId: number;
}

export interface ProductVariationImgInput
  extends Omit<ProductVariationImgTypes, 'id'> {}
export interface ProductVariationImgOutput
  extends Required<ProductVariationImgTypes> {}
