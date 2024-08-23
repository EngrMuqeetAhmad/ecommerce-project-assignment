import { UserWishServices } from '../../services/userWish/userWish.services';

export class UserWishControllers {
  private userWishServices: UserWishServices;

  constructor() {
    this.userWishServices = new UserWishServices();
  }

  public getWholeWish = async (req: any, res: any, next: any) => {
    await this.userWishServices.getWholeWish(req, res, next);
  };

  public deleteFromWish = async (req: any, res: any, next: any) => {
    await this.userWishServices.deleteItemFromWish(req, res, next);
  };
  public addToWish = async (req: any, res: any, next: any) => {
    await this.userWishServices.addItemToWish(req, res, next);
  };
}
