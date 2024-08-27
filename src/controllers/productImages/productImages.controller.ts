import { VariationImageServices } from '../../services/productImages/productImages.services';

export class ProductImageControllers {
  private variationImageServices: VariationImageServices;

  constructor() {
    this.variationImageServices = new VariationImageServices();
  }

  public getAllVariationImages = async (req: any, res: any, next: any) => {
    await this.variationImageServices.getAllVariationImages(req, res, next);
  };

  public deleteImage = async (req: any, res: any, next: any) => {
    await this.variationImageServices.deleteImage(req, res, next);
  };
  public addImage = async (req: any, res: any, next: any) => {
    await this.variationImageServices.addImage(req, res, next);
  };
}
