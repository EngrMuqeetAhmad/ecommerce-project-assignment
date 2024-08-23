import { UserCartServices } from '../../services/userCart/userCart.services';

export class UserCartControllers {
  private userCartServices: UserCartServices;

  constructor() {
    this.userCartServices = new UserCartServices();
  }

  public getWholeCart = async (req: any, res: any, next: any) => {
    await this.userCartServices.getWholeCart(req, res, next);
  };

  public deleteFromCart = async (req: any, res: any, next: any) => {
    await this.userCartServices.deleteItemFromCart(req, res, next);
  };
  public addToCart = async (req: any, res: any, next: any) => {
    await this.userCartServices.addItemToCart(req, res, next);
  };
}
