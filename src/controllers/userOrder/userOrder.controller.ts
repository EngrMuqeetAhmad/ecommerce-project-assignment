import { UserOrderServices } from '../../services/userOrder/userOrder.services';

export class UserOrderControllers {
  private userOrderServices: UserOrderServices;

  constructor() {
    this.userOrderServices = new UserOrderServices();
  }

  public getAllOrders = async (req: any, res: any, next: any) => {
    await this.userOrderServices.getAllOrders(req, res, next);
  };

  public getOrder = async (req: any, res: any, next: any) => {
    await this.userOrderServices.getOrder(req, res, next);
  };

  public deleteOrder = async (req: any, res: any, next: any) => {
    await this.userOrderServices.deleteOrderAndAssociatedProducts(
      req,
      res,
      next,
    );
  };
  public createOrder = async (req: any, res: any, next: any) => {
    await this.userOrderServices.createOrder(req, res, next);
  };
}
