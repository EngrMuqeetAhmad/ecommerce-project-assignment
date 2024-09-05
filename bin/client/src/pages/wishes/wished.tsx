import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Products } from '../../components/card/Products';
import { WishProducts } from '../../components/card/WishProducts';

export const Wishes: FC = () => {
  return (
    <Container fluid className="p-0 mt-4 min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Container fluid="lg">
            <WishProducts />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
