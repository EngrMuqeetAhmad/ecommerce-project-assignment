import { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ShippingAddressServices } from '../../../services/shippingAddress.service';
import { ShippingAddressTypes } from '../../../types/shippingAddress';
import { ShippingAddress } from './shippingAddress';

export const ShippingAddressList: FC = () => {
  const [data, setData] = useState<Array<ShippingAddressTypes>>();
  useEffect(() => {
    ShippingAddressServices.GetAllShippingAddress()
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Container>
        {data?.map((item: ShippingAddressTypes) => (
          <ShippingAddress key={item.ID} data={item} />
        ))}
        <hr />
      </Container>
    </>
  );
};
