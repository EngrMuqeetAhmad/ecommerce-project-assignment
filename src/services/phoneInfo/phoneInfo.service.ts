import { Op } from 'sequelize';
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
        id: id,
      },
    });
    return;
  }

  public static async getAllPhoneInfos(
    userId: number,
  ): Promise<Array<PhoneInfoOutput>> {
    const result: Array<PhoneInfoOutput> = await PhoneInfo.findAll({
      where: {
        userId: {
          [Op.eq] : userId
        },
      },
    });

    return result;
  }

  public static async getPhoneInfo(
    id: number,
  ): Promise<PhoneInfoOutput | null> {
    const result: PhoneInfoOutput | null = await PhoneInfo.findOne({
      where: {
        id: id,
      },
    });

    return result;
  }

  public static async deletePhoneInfo(id: number): Promise<number> {
    const result: number = await PhoneInfo.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async addPhoneInfo(payload: PhoneInfoInput): Promise<void> {
    await PhoneInfo.create(payload);

    return;
  }
}
