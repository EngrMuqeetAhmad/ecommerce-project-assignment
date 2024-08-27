import { VariationTypeServices } from '../../services/variationType/variationType.services';

export class VariationTypeControllers {
  private variationTypeServices: VariationTypeServices;

  constructor() {
    this.variationTypeServices = new VariationTypeServices();
  }

  public getAllVariationTypes = async (req: any, res: any, next: any) => {
    await this.variationTypeServices.getAllVariationTypes(req, res, next);
  };

  public deleteVariationType = async (req: any, res: any, next: any) => {
    await this.variationTypeServices.deleteVariationType(req, res, next);
  };
  public addVariationType = async (req: any, res: any, next: any) => {
    await this.variationTypeServices.addVariationType(req, res, next);
  };
}
