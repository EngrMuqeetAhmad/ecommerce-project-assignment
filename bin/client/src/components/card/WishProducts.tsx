import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Test from '../../assets/images/test1.jpg';
import { WishProductCard } from './WishProductCard';
export const WishProducts: FC = () => {
  return (
    <>
      <Row xs={2} md={3} xl={4} className="g-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Col key={i}>
            <WishProductCard
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
