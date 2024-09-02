import axios, { AxiosResponse } from 'axios';

// import dotenv from 'dotenv';
import { User, UserRegisterInput } from '../types';
import { URL } from '../utils/globals';

export class UserServices {
  public static async RegisterUser(
    data: UserRegisterInput
  ): Promise<AxiosResponse> {
    const res: AxiosResponse = await axios
      .put(`${URL}/user/`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return res;
  }

  public static async GetUser(): Promise<User | null> {
    try {
      const user: User | null = await axios.get(`${URL}/user/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      return user;
    } catch (error) {
      console.error('Error logging in:');
      return null;
    }
  }

  public static async Login(email: string, password: string): Promise<void> {
    try {
      const token: AxiosResponse = await axios.post(
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

      localStorage.setItem('jwtToken', token.data.token);
    } catch (error) {
      console.error('Error logging in:');
    }

    return;
  }

  public static async Logout(): Promise<void> {
    try {
      await axios.post(
        `${URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
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
