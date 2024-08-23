import { UserCartServices } from '../../services/userCart/userCart.services';

export class UserCartControllers {
  private userCartServices: UserCartServices;

  constructor() {
    this.userCartServices = new UserCartServices();
  }

  public getWholeCart = async (req: any, res: any, next: any) => {
    await this.userCartServices.getWholeCart(req, res, next);
  };

  public delete = async (req: any, res: any, next: any) => {
    await this.userCartServices.deleteCartItem(req, res, next);
  };
  public add = async (req: any, res: any, next: any) => {
    await this.userCartServices.addCartItem(req, res, next);
  };
}
