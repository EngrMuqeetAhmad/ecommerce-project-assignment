import { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { PaymentMethod } from './PaymentMethod';
import { PaymentMethodOutputTypes } from '../../../types/paymentMethod.types';
import { PaymentMethodServices } from '../../../services/paymentMethod.service';

export const PaymentMethodList: FC = () => {
  const [data, setData] = useState<Array<PaymentMethodOutputTypes>>();
  useEffect(() => {
    PaymentMethodServices.GetAllPaymentMethods()
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
        {data?.map((item: PaymentMethodOutputTypes) => (
          <PaymentMethod key={item.id} data={item} />
        ))}
        <hr />
      </Container>
    </>
  );
};
