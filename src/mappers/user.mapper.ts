import { UserInput, UserOutput, UserUpdate } from '../types/';
import { Role } from '../utils/enum.util';

export class UserMapper {
  public static toUserDTOInput(model: any): UserInput {
    return {
      firstName: model.firstName,
      secondName: model.secondName,
      email: model.email,
      isVerified: false,
      password: model.password,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      stripeID: model.stripeID,
    };
  }
  public static toUserDTOUpdate(model: any): UserUpdate {
    return {
      firstName: model.firstName,
      secondName: model.secondName,
      role: model.role,
      email: model.email,
    };
  }
  public static toUserDTOOutput(model: any): UserOutput {
    return {
      ID: model.ID,
      firstName: model.firstName,
      secondName: model.secondName,
      email: model.email,
      isVerified: model.isVerified,
      role: model.role,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),

      stripeID: model.stripeID,
    };
  }
}
