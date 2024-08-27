import { WishProductInput, WishProductOuput } from '../types';

export class WishProductMapper {
  public static toDTOInput(model: any): WishProductInput {
    return {
      productID: model.productID,
      wishTableID: model.wishTableID,
      userID: model.userID,
    };
  }

  public static toDTOOutput(model: any): WishProductOuput {
    return {
      ID: model.ID,
      productID: model.productID,
      wishTableID: model.wishTableID,
      userID: model.userID,
    };
  }
}
