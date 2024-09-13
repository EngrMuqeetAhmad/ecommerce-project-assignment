import { FC } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import Test from '../../assets/images/test1.jpg';
export const ProductList: FC<{
  data: any;
}> = ({ data }) => {
  return (
    <>
      <Row xs={1} md={3} xl={4} className="g-2 mb-4">
        {data?.map((item: any) => (
          <Col key={item.id}>
            <ProductCard
              title={item.title}
              description={item.description}
              id={item.id}
              image={`${Test}`}
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
