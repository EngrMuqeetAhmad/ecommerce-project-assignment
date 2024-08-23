import dotenv from 'dotenv';
import { UserMapper } from '../../mappers';
import UserServices from '../../services/user/user.services';
import { UserInput } from '../../types/user.types';

import { Role } from '../../types/userTypes';
class UserControllers {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }
  public updateIsVerified = async (req: any, res: any, next: any) => {
    await this.userServices.makeVerified(req, res, next);
  };
  public resetPassword = async (req: any, res: any) => {
    await this.userServices.resetPassword(req, res);
  };
  public getUser = async (req: any, res: any) => {
    await this.userServices.getUser(req, res);
  };
  public updateUser = async (req: any, res: any) => {
    await this.userServices.updateUser(req, res);
  };
  public userLogin = async (req: any, res: any) => {
    await this.userServices.userLogin(req, res);
  };

  public userRegister = async (req: any, res: any, next: any) => {
    await this.userServices.userRegister(req, res, next);
  };
}

export default UserControllers;
