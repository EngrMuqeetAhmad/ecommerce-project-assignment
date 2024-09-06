import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import { CreateBaseProduct } from '../../components/dashboard/baseProduct';

export const DashBoard: FC = () => {
  return (
    <>
      <Container>
       
        <CreateBaseProduct />
      </Container>
    </>
  );
};
