import { ShippigAddressServices } from '../../services/shippingAddress/shippingAddress.services';
export class ShippingAddressControllers {
  private shippingAddressServices: ShippigAddressServices;

  constructor() {
    this.shippingAddressServices = new ShippigAddressServices();
  }

  public getAllShippingAddress = async (req: any, res: any, next: any) => {
    await this.shippingAddressServices.getAllShippingAddress(req, res, next);
  };
  public getShippingAddress = async (req: any, res: any, next: any) => {
    await this.shippingAddressServices.getShippingAddress(req, res, next);
  };
  public updateShippingAddress = async (req: any, res: any, next: any) => {
    await this.shippingAddressServices.updateShippingAddress(req, res, next);
  };
  public deleteShippingAddress = async (req: any, res: any, next: any) => {
    await this.shippingAddressServices.deleteShippingAddress(req, res, next);
  };
  public addShippingAddress = async (req: any, res: any, next: any) => {
    await this.shippingAddressServices.addShippingAddress(req, res, next);
  };
}
