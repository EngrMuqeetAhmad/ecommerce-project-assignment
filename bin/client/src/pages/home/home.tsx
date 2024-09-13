import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Crousel } from '../../components/Slider/Carousel';
import { CategoryServices } from '../../services/category.service';
import { CategoryAndSubCateList } from '../../components/categories/categoryAndSubCatList';

export const Home: FC = () => {
  const [data, setData] = useState();

  useEffect(() => {
    CategoryServices.GetCategoriesNSubCategories()
      .then((response: any) => {
        setData(response?.data?.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <CategoryAndSubCateList data={data} />
          </Container>
        </Col>
      </Row>
      {/* <hr />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Container fluid="lg">
            <ProductList />
          </Container>
        </Col>
      </Row> */}
    </Container>
  );
};
