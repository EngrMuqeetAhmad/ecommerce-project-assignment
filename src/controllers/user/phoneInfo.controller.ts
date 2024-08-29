import { Request, Response } from 'express';
import PhoneInfoServices from '../../services/phoneInfo/phoneInfo.service';
import {
  PhoneInfoInput,
  PhoneInfoOutput,
  PhoneInfoTypes,
  PhoneInfoUpdate,
} from '../../types';

export default class PhoneInfoController {
  public static async getAllPhoneNumber(req: Request, res: Response) {
    const { ID } = req.body.user;
    try {
      const data: Array<PhoneInfoOutput> =
        await PhoneInfoServices.getAllPhoneInfos(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting phone no' });
      return;
    }
  }
  public static async getPhoneNumber(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const data: PhoneInfoOutput | null =
        await PhoneInfoServices.getPhoneInfo(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting phone no' });
      return;
    }
  }
  public static async makePrimary(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    const payload: PhoneInfoUpdate = {
      primary: true,
    };
    try {
      await PhoneInfoServices.makePrimary(payload, ID);
      res.status(200).json({ message: 'Successfully made primarr phoneINFO' });
      return;
    } catch (error) {
      res.json({ error: 'Error updating phone no' });
      return;
    }
  }
  public static async deletePhoneNumber(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number = await PhoneInfoServices.deletePhoneInfo(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting phone no' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting phone no' });
    }
  }
  public static async addPhoneNumber(req: Request, res: Response) {
    const { ID } = req.body.user; //userID
    const { countryCode, phoneNumber } = req.body;

    const payload: PhoneInfoInput = {
      countryCode,
      phoneNumber,
      userID: ID,
      primary: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };

    try {
      await PhoneInfoServices.addPhoneInfo(payload);
      res.status(200).json({ message: 'Phone Number added to user' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding Phone No to user' });
      return;
    }
  }
}
