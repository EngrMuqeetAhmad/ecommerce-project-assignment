import axios, { AxiosError, AxiosResponse } from 'axios';
import { URL } from '../utils/globals';

export class ProductServices {
  public static async getAllBaseProducts() {
    const res = await axios.get(`${URL}/product/baseProduct/all`, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    return res;
  }

  public static async GetBaseProductByCategory(
    category: string,
    subCategory: string
  ) {
    const res = await axios.get(
      `${URL}/product/baseProduct/${category}/${subCategory}`,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );
    return res;
  }

  public static async AddProductVariation(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res = await axios.put(`${URL}/product/variation`, data, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }

  public static async AddBaseProduct(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res = await axios.put(`${URL}/product/baseProduct/`, data, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }
  //   public static async UpdateShippingAddress(
  //     data: ShippingAddressInput,
  //     id: number
  //   ) {
  //     const res = await axios.post(
  //       `${URL}/product/shippingAddress/${id}`,
  //       data,
  //       {
  //         headers: {
  //           'x-api-key': 'muqeetahmad',
  //           Authorization: `${localStorage.getItem('jwtToken')}`,
  //         },
  //       }
  //     );
  //     return res;
  //   }
}
