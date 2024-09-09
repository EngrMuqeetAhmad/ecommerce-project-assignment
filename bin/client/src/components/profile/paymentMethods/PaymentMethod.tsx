import { FC, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { TYPE } from '../../../types/toast.types';
import { ToastComponent } from '../../Toast/Toast';
import { PaymentMethodOutputTypes } from '../../../types/paymentMethod.types';

export const PaymentMethod: FC<{
  data: PaymentMethodOutputTypes;
}> = ({ data }) => {
  const { fullName, lastFour, expMonth, expYear } = data;

  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });

  return (
    <>
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={setToast}
        type={toast.type}
        message={toast.message}
      />
      <Container>
        <Stack direction="vertical" gap={2}>
          <span>Full Name: {fullName}</span>
          <span>
            expiry: {expMonth} / {expYear}
          </span>

          <span>CardNumber: ---- ---- ---- {lastFour}</span>
        </Stack>
      </Container>
      <hr />
    </>
  );
};
