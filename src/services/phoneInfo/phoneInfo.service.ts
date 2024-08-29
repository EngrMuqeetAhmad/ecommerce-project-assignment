import { PhoneInfo } from '../../models/phoneInfo.model';
import {
  PhoneInfoInput,
  PhoneInfoOutput,
  PhoneInfoUpdate,
} from '../../types/phoneInfo.types';

export default class PhoneInfoServices {
  public static async makePrimary(
    payload: PhoneInfoUpdate,
    id: number,
  ): Promise<void> {
    await PhoneInfo.update(payload, {
      where: {
        ID: id,
      },
    });
    return;
  }

  public static async getAllPhoneInfos(
    userID: number,
  ): Promise<Array<PhoneInfoOutput>> {
    const result: Array<PhoneInfoOutput> = await PhoneInfo.findAll({
      where: {
        userID,
      },
    });

    return result;
  }

  public static async getPhoneInfo(
    id: number,
  ): Promise<PhoneInfoOutput | null> {
    const result: PhoneInfoOutput | null = await PhoneInfo.findOne({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async deletePhoneInfo(id: number): Promise<number> {
    const result: number = await PhoneInfo.destroy({
      where: {
        ID: id,
      },
    });
    return result;
  }

  public static async addPhoneInfo(payload: PhoneInfoInput): Promise<void> {
    await PhoneInfo.create(payload);

    return;
  }
}
