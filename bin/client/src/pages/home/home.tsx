import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProductList } from '../../components/card/ProductList';
import { Crousel } from '../../components/Slider/Carousel';

export const Home: FC = () => {
  return (
    <Container fluid className="p-0 min-vh-100">
      <Row className="justify-content-center d-none d-md-flex">
        <Col xs={12}>
          <Container className="p-0 p-sm-2 " fluid="lg">
            <Crousel />
          </Container>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Container fluid="lg">
            <ProductList />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
