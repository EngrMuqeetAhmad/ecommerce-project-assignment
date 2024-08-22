import { UserInput, UserOutput } from '../types/';
import { Role } from '../types/userTypes';

export class UserMapper {
  public static toUserDTOInput(model: any): UserInput {
    const role: Role = model.role ? model.role : Role.USER;

    return {
      firstName: model.firstName,
      secondName: model.secondName,
      email: model.email,
      isVerified: false,
      password: model.password,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      stripeID: model.stripeID,
    };
  }
  public static toUserDTOOutput(model: any): UserOutput {
    const role: Role = model.role;
    return {
      ID: model.ID,
      firstName: model.firstName,
      secondName: model.secondName,
      email: model.email,
      isVerified: model.isVerified,
      role: model.role,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: new Date(`${model.deletedAt}`),
      stripeID: model.stripeID,
    };
  }
}
