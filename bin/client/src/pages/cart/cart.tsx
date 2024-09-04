import { FC } from 'react';
import { Row } from 'react-bootstrap';
import { CartProduct } from '../../components/card/CartProductCard';

export const Cart: FC = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <Row key={i}>
          <CartProduct
          // title="Men Dress Shirt"
          // description="100% cottom Dress Shirt, hand Stiched"
          // id={i}
          // image={`${Test}`}
          // category="MEN"
          // subCategory="Shirts"
          />
        </Row>
      ))}
    </>
  );
};
