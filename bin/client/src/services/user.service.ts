import axios, { AxiosError, AxiosResponse } from 'axios';

// import dotenv from 'dotenv';
import { UserRegisterInput, UserUpdate } from '../types';
import { URL } from '../utils/globals';

export class UserServices {
  public static async verifyResetToken(token: string): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.post(
      `${URL}/user/resetPassword/${token}`,
      {},
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );
    return res;
  }

  public static async resetPassword(
    token: string,
    password: string
  ): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.post(
      `${URL}/user/resetPassword/y/${token}`,
      {
        password,
      },
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );
    return res;
  }

  public static async EmailVerification(email: string): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.post(
      `${URL}/user/resetPassword`,
      { email, accessRoute: 'resetPassword' },
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );
    return res;
  }

  public static async UpdateUser(
    data: Partial<UserUpdate>
  ): Promise<AxiosResponse | AxiosError> {
    const res: AxiosResponse | AxiosError = await axios.post(
      `${URL}/user/`,
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

  public static async VerifyUser(
    token: string
  ): Promise<AxiosResponse | AxiosError> {
    const res = await axios.get(`${URL}/user/verify-email/${token}`, {
      headers: {
        'x-api-key': 'muqeetahmad',
      },
    });
    return res;
  }

  public static async RegisterUser(
    data: UserRegisterInput
  ): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.put(`${URL}/user/`, data, {
      headers: {
        'x-api-key': 'muqeetahmad',
      },
    });

    return res;
  }

  public static async GetUser(): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.get(`${URL}/user/`, {
      headers: {
        Authorization: `${localStorage.getItem('jwtToken')}`,
        'x-api-key': 'muqeetahmad',
      },
    });
    return res;
  }

  public static async Login(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios.post(
      `${URL}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'x-api-key': 'muqeetahmad',
        },
      }
    );

    if (
      res.data.token != undefined &&
      res.data.token != null &&
      res.data.token != ''
    ) {
      localStorage.setItem('jwtToken', res.data.token);
    }

    return res;
  }

  public static async Logout(): Promise<void> {
    try {
      await axios.post(
        `${URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem('jwtToken')}`,
            'x-api-key': 'muqeetahmad',
          },
        }
      );
      localStorage.removeItem('jwtToken');
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:');
    }
    return;
  }
}
