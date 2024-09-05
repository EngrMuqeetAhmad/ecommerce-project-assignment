import { FC } from 'react';
import { Button, Stack } from 'react-bootstrap';

export const CartCalculations: FC = () => {
  return (
    <>
      <Stack
        direction="vertical"
        gap={3}
        className="shadow-sm p-4 rounded border"
        style={{
          zIndex: '1',
        }}
      >
        <Stack direction="vertical" gap={2} className="">
          <span className="h6 text-muted text-end">Discount: $5</span>
          <hr />
          <span className="h6 fw-semibold text-end">Total: $350</span>
        </Stack>
        <Button variant="outline-dark" size="lg">
          CheckOut <i className="fas fa-money-check"></i>
        </Button>
      </Stack>
    </>
  );
};
