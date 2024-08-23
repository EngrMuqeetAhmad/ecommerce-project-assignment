import { UserWishInput, UserWishOutput } from '../types';

export class UserWishMapper {
  public static toUserWishDTOInput(model: any): UserWishInput {
    return {
      userID: model.userID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toUserWishDTOOutput(model: any): UserWishOutput {
    return {
      ID: model.ID,
      userID: model.ID,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: new Date(`${model.deletedAt}`),
    };
  }
}
