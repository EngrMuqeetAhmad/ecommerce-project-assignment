import { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FullScreenModal } from '../../modal/fullScreenModal';
import { AddPaymentMethod } from './AddPaymentMethod';
import { Button, Stack } from 'react-bootstrap';
import { PaymentMethodList } from './PaymentMethodList';

export const PaymentMethodContent: FC = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Container fluid>
        <Stack direction="vertical" gap={3}>
          <Button variant="primary" onClick={() => setShow(true)}>
            Add Payment Method
          </Button>
          <FullScreenModal
            title="Add Payment Method"
            show={show}
            setShow={setShow}
          >
            <AddPaymentMethod />
          </FullScreenModal>
          <hr />
          <PaymentMethodList />
        </Stack>
      </Container>
    </>
  );
};
