import { ProductServices } from '../../services/product/product.services';

export class ProductControllers {
  private productServices: ProductServices;

  constructor() {
    this.productServices = new ProductServices();
  }
  public getAllProducts = async (req: any, res: any, next: any) => {
    await this.productServices.getAllProducts(req, res, next);
  };

  public getProduct = async (req: any, res: any, next: any) => {
    await this.productServices.getProduct(req, res, next);
  };

  public deleteProduct = async (req: any, res: any, next: any) => {
    await this.productServices.deleteProduct(req, res, next);
  };
  public addProduct = async (req: any, res: any, next: any) => {
    await this.productServices.addProduct(req, res, next);
  };
}
