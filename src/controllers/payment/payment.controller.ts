import { PaymentServices } from '../../services/payment/payment.services';

export class PaymentControllers {
  public paymentServices: PaymentServices;

  constructor() {
    this.paymentServices = new PaymentServices();
  }
  public calculatePayment = async (req: any, res: any, next: any) => {
    await this.paymentServices.calculatePayment(req, res, next);
  };
  public createPaymentIntent = async (req: any, res: any, next: any) => {
    await this.paymentServices.createPaymentIntent(req, res, next);
  };

  public getAllPaymentMethods = async (req: any, res: any, next: any) => {
    await this.paymentServices.getAllPaymentMethod(req, res, next);
  };
  public getPaymentMethod = async (req: any, res: any, next: any) => {
    await this.paymentServices.getPaymentMethod(req, res, next);
  };

  public deletePaymentMethod = async (req: any, res: any, next: any) => {
    await this.paymentServices.deletePaymentMethod(req, res, next);
  };

  public createPaymentMethod = async (req: any, res: any, next: any) => {
    await this.paymentServices.createPaymentMethod(req, res, next);
  };
}
