import { CategoryServices } from '../../services/category/category.services';

export class CategoryControllers {
  private categoryServices: CategoryServices;

  constructor() {
    this.categoryServices = new CategoryServices();
  }

  public getAllCategories = async (req: any, res: any, next: any) => {
    await this.categoryServices.getAllCategories(req, res, next);
  };

  public deleteCategory = async (req: any, res: any, next: any) => {
    await this.categoryServices.deleteCategory(req, res, next);
  };
  public addCategory = async (req: any, res: any, next: any) => {
    await this.categoryServices.addCategory(req, res, next);
  };
}
