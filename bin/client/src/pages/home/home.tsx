import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProductList } from '../../components/card/ProductList';
import { Crousel } from '../../components/Slider/Carousel';
import { ProductServices } from '../../services/product.service';

export const Home: FC = () => {
  const [data, setData] = useState();

  const [category, setCategory] = useState('men');
  const [subCategory, setSubCategory] = useState('shirt');

  useEffect(() => {
    ProductServices.GetBaseProductByCategory(category, subCategory)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subCategory]);

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
