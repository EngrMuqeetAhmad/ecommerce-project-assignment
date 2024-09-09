import axios from 'axios';

export class ProductServices {
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
