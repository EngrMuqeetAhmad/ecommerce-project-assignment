import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartProductCard } from '../../components/card/CartProductCard';
import { CartCalculations } from '../../components/card/cartCalculations';

export const Cart: FC = () => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={6}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Container key={i}>
                <CartProductCard
                // title="Men Dress Shirt"
                // description="100% cottom Dress Shirt, hand Stiched"
                // id={i}
                // image={`${Test}`}
                // category="MEN"
                // subCategory="Shirts"
                />
              </Container>
            ))}
          </Col>
          <Col xs={12} md={4} className="d-none d-md-block">
            <CartCalculations />
          </Col>
        </Row>
      </Container>
      <Container className="position-fixed bottom-0 bg-white d-flex d-md-none justify-content-center align-items-center">
        <CartCalculations />
      </Container>
    </>
  );
};
