import { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FullScreenModal } from '../../modal/fullScreenModal';
import { AddShippingAddress } from './AddShippingAddress';
import { Button, Stack } from 'react-bootstrap';
import { ShippingAddressList } from './ShippingAddressList';

export const ShippingAddressContent: FC = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Container fluid>
        <Stack direction="vertical" gap={3}>
          <Button variant="primary" onClick={() => setShow(true)}>
            Add Shipping Address
          </Button>
          <FullScreenModal
            title="Add Shipping Address"
            show={show}
            setShow={setShow}
          >
            <AddShippingAddress />
          </FullScreenModal>
          <hr />
          <ShippingAddressList />
        </Stack>
      </Container>
    </>
  );
};
