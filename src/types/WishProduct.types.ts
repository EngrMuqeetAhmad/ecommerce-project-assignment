export interface WishProduct {
  productId: number;
  wishTableId: number;
}

export interface WishProductInput extends Omit<WishProduct, 'id'> {}
export interface WishProductOuput extends Required<WishProduct> {}
