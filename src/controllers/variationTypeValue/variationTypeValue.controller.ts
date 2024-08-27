import { VariationTypeValueServices } from '../../services/variationTypeValue/variationTypeValue.services';

export class VariationTypeValueControllers {
  private variationTypeValueServices: VariationTypeValueServices;

  constructor() {
    this.variationTypeValueServices = new VariationTypeValueServices();
  }

  public getAllVariationTypeValues = async (req: any, res: any, next: any) => {
    await this.variationTypeValueServices.getAllVariationTypeValues(req, res, next);
  };

  public deleteVariationTypeValue = async (req: any, res: any, next: any) => {
    await this.variationTypeValueServices.deleteVariationTypeValue(req, res, next);
  };
  public addVariationTypeValue = async (req: any, res: any, next: any) => {
    await this.variationTypeValueServices.addVariationTypeValue(req, res, next);
  };
}
