import { UserCartInput, UserCartOutput } from '../types';

export class UserCartMapper {
  public static toUserCartDTOInput(model: any): UserCartInput {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toUserCartDTOOutput(model: any): UserCartOutput {
    return {
      ID: model.ID,
      userID: model.ID,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: new Date(`${model.deletedAt}`),
    };
  }
}
