import { SubCategoryServices } from '../../services/subCategory/subCategory.services';

export class SubCategoryControllers {
  private subCategoryServices: SubCategoryServices;

  constructor() {
    this.subCategoryServices = new SubCategoryServices();
  }

  public getAllSubCategories = async (req: any, res: any, next: any) => {
    await this.subCategoryServices.getAllSubCategories(req, res, next);
  };

  public deleteSubCategory = async (req: any, res: any, next: any) => {
    await this.subCategoryServices.deleteSubCategory(req, res, next);
  };
  public addSubCategory = async (req: any, res: any, next: any) => {
    await this.subCategoryServices.addSubCategory(req, res, next);
  };
}
