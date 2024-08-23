import { PhoneInfoMapper } from '../../mappers/';
import PhoneInfo from '../../models/phoneInfo.model';
import { PhoneInfoInput, PhoneInfoOutput } from '../../types/phoneInfo.types';

export default class PhoneInfoServices {
  public async updatePhoneInfo(req: any, res: any, next: any): Promise<void> {
    const payload: Partial<PhoneInfo> = PhoneInfoMapper.toPhoneInfoDTOInput(
      req.body,
    );
    try {
      await PhoneInfo.update(payload, {
        where: {
          ID: req.body.ID,
        },
      });
      res.status(200).json({ message: 'Successfully updated phoneINFO' });
      return;
    } catch (error) {
      res.json({ error: 'Error updating phone no' });
      return;
    }
  }

  public async getAllPhoneInfos(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    try {
      let phoneInfos: Array<PhoneInfoOutput>;
      const result: Array<any> = await PhoneInfo.findAll({
        where: {
          userID: ID,
        },
      });
      phoneInfos = result.map((data: any) =>
        PhoneInfoMapper.toPhoneInfoDTOOutput(data),
      );
      res.status(200).json({ data: phoneInfos });
      return;
    } catch (error) {
      res.json({ error: 'Error getting phone no' });
      return;
    }
  }

  public async getPhoneInfo(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;
    try {
      let phoneInfo: PhoneInfoOutput;
      const result: any = await PhoneInfo.findOne({
        where: {
          ID: ID,
        },
      });
      phoneInfo = PhoneInfoMapper.toPhoneInfoDTOOutput(result);
      res.status(200).json({ data: phoneInfo });
      return;
    } catch (error) {
      res.json({ error: 'Error getting phone no' });
      return;
    }
  }

  public async deletePhoneInfo(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await PhoneInfo.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting phone no' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting phone no' });
    }
  }

  public async addPhoneInfo(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user; //userID

    req.body.userID = ID;

    const payload: PhoneInfoInput = PhoneInfoMapper.toPhoneInfoDTOInput(
      req.body,
    );

    try {
      await PhoneInfo.create(payload);
      res.status(200).json({ message: 'Phone Number added to user' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding Phone No to user' });
      return;
    }
  }
}
