import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import Test from '../../assets/images/test1.jpg';
export const Products: FC = () => {
  return (
    <>
      <Row xs={1} md={3} xl={4} className="g-4">
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
    </>
  );
};
