import PhoneInfoServices from '../../services/phoneInfo/phoneInfo.services';

export default class PhoneInfoController {
  private phoneInfoServices: PhoneInfoServices;

  constructor() {
    this.phoneInfoServices = new PhoneInfoServices();
  }
  public getAllPhoneNumber = async (req: any, res: any, next: any) => {
    await this.phoneInfoServices.getAllPhoneInfos(req, res, next);
  };
  public getPhoneNumber = async (req: any, res: any, next: any) => {
    await this.phoneInfoServices.getPhoneInfo(req, res, next);
  };
  public updatePhoneNumber = async (req: any, res: any, next: any) => {
    await this.phoneInfoServices.updatePhoneInfo(req, res, next);
  };
  public deletePhoneNumber = async (req: any, res: any, next: any) => {
    await this.phoneInfoServices.deletePhoneInfo(req, res, next);
  };
  public addPhoneNumber = async (req: any, res: any, next: any) => {
    await this.phoneInfoServices.addPhoneInfo(req, res, next);
  };
}
