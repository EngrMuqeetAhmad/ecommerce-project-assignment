import axios, { AxiosError, AxiosResponse } from 'axios';
import { BaseProductTypes } from '../types/product.types';
import { URL } from '../utils/globals';

export class DasboardServices {
  public static async CreateBaseProduct(
    data: BaseProductTypes
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.put(
      `${URL}/product/baseProduct`,
      data,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    console.log("res,", res);
    return res;
  }
}
