import { PhoneInfoInput, PhoneInfoOutput } from '../types/phoneInfo.types';

export class PhoneInfoMapper {
  public static toPhoneInfoDTOInput(model: any): PhoneInfoInput {
    return {
      userID: model.number,
      countryCode: model.number,
      phoneNumber: model.string,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
  }
  public static toUserDTOOutput(model: any): PhoneInfoOutput {
    return {
      ID: model.ID,
      userID: model.number,
      countryCode: model.number,
      phoneNumber: model.string,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
  }
}
