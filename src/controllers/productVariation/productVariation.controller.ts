import { ProductVariationServices } from "../../services/productVariation/productVariation.services";

export class ProductVariationControllers {
  private productVariationServices: ProductVariationServices;

  constructor() {
    this.productVariationServices = new ProductVariationServices();
  }


  public getProductVariation = async (req: any, res: any, next: any) => {
    await this.productVariationServices.getProductVariation(req, res, next);
  };


  public getAllProductVariations = async (req: any, res: any, next: any) => {
    await this.productVariationServices.getAllProductVariations(req, res, next);
  };

  public deleteProductVariation = async (req: any, res: any, next: any) => {
    await this.productVariationServices.deleteProductVariation(req, res, next);
  };
  public addProductVariation = async (req: any, res: any, next: any) => {
    await this.productVariationServices.addProductVariation(req, res, next);
  };
}
