import { BaseProductServices } from '../../services/baseProduct/baseProduct.services';

export class BaseProductControllers {
  private baseProductServices: BaseProductServices;

  constructor() {
    this.baseProductServices = new BaseProductServices();
  }

  public getBaseProduct = async (req: any, res: any, next: any) => {
    await this.baseProductServices.getBaseProduct(req, res, next);
  };

  public deleteBaseProduct = async (req: any, res: any, next: any) => {
    await this.baseProductServices.deleteBaseProduct(req, res, next);
  };
  public addBaseProduct = async (req: any, res: any, next: any) => {
    await this.baseProductServices.addBaseProduct(req, res, next);
  };
}
