import { FC } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import Test from '../../assets/images/test1.jpg';
export const ProductList: FC = () => {
  return (
    <>
      <Row xs={1} md={3} xl={4} className="g-2 mb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Col key={i}>
            <ProductCard
              title="Men Dress Shirt"
              description="100% cottom Dress Shirt, hand Stiched"
              id={i}
              image={`${Test}`}
              category="MEN"
              subCategory="Shirts"
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Container className="d-flex justify-content-center">
          <Button variant="outline-dark" size="lg">
            Load <i className="fas fa-plus"></i>
          </Button>
        </Container>
      </Row>
    </>
  );
};
