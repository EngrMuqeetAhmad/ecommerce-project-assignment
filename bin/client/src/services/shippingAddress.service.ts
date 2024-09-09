import axios, { AxiosError, AxiosResponse } from 'axios';

// import dotenv from 'dotenv';
import { URL } from '../utils/globals';
import { ShippingAddressInput } from '../types/shippingAddress';

export class ShippingAddressServices {
  public static async GetAllShippingAddress() {
    const res = await axios.get(`${URL}/user/shippingAddress/all`, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    return res;
  }

  public static async UpdateShippingAddress(
    data: ShippingAddressInput,
    id: number
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.post(
      `${URL}/user/shippingAddress/${id}`,
      data,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    return res;
  }

  public static async CreateShippingAddress(
    data: ShippingAddressInput
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.put(
      `${URL}/user/shippingAddress/`,
      data,
      {
        headers: {
          'x-api-key': 'muqeetahmad',
          Authorization: `${localStorage.getItem('jwtToken')}`,
        },
      }
    );
    return res;
  }
}
