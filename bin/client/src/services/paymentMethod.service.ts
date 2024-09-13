import axios, { AxiosError, AxiosResponse } from 'axios';

// import dotenv from 'dotenv';
import { URL } from '../utils/globals';

export class PaymentMethodServices {
  public static async GetAllPaymentMethods() {
    const res = await axios.get(`${URL}/payment/all`, {
      headers: {
        'x-api-key': 'muqeetahmad',
        Authorization: `${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(res);
    return res;
  }

  public static async CreatePaymentMethod(
    data: any
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.put(
      `${URL}/payment/`,
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
