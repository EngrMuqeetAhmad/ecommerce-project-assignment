import axios, { AxiosError, AxiosResponse } from 'axios';

// import dotenv from 'dotenv';
import { URL } from '../utils/globals';

export class CategoryServices {
  //   public static async GetAllPaymentMethods() {
  //     const res = await axios.get(`${URL}/payment/all`, {
  //       headers: {
  //         'x-api-key': 'muqeetahmad',
  //         Authorization: `${localStorage.getItem('jwtToken')}`,
  //       },
  //     });
  //     console.log(res);
  //     return res;
  //   }

  public static async AddSubCategory(
    categoryId: number,
    subCategory: string
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.put(
      `${URL}/subCategory/`,
      {
        categoryId,
        subCategory,
      },
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    console.log(res);
    return res;
  }

  public static async GetCategoriesNSubCategories(): Promise<
    AxiosResponse | AxiosError
  > {
    const res: AxiosResponse | AxiosError = await axios.get(
      `${URL}/category/all`,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );
    console.log(res);
    return res;
  }

  public static async AddCategory(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.put(
      `${URL}/category/`,
      data,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    console.log(res);
    return res;
  }
}
