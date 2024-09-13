import axios, { AxiosError, AxiosResponse } from 'axios';
import { URL } from '../utils/globals';

export class VariationServices {
  public static async getAllVariationTypes() {
    const res = await axios.get(`${URL}/product/variationType/all`, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }

  public static async getAllVariationTypesWithAssociated() {
    const res = await axios.get(`${URL}/product/variationType/associated/all`, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }

  public static async GetValuesByVariationType(variationType: string) {
    const res = await axios.get(
      `${URL}/product/variationTypeValue/${variationType}`,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    return res;
  }
  public static async AddVariationTypeValue(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res = await axios.put(`${URL}/product/variationTypeValue`, data, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }

  public static async AddVariationType(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res = await axios.put(`${URL}/product/variationType`, data, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }
}
