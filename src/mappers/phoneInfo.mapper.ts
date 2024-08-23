import { PhoneInfoInput, PhoneInfoOutput } from '../types/phoneInfo.types';

export class PhoneInfoMapper {
  public static toPhoneInfoDTOInput(model: any): PhoneInfoInput {
    return {
      userID: model.userID,
      countryCode: model.countryCode,
      phoneNumber: model.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }
  public static toPhoneInfoDTOOutput(model: any): PhoneInfoOutput {
    return {
      ID: model.ID,
      userID: model.userID,
      countryCode: model.countryCode,
      phoneNumber: model.phoneNumber,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: new Date(`${model.deletedAt}`),
    };
  }
}
