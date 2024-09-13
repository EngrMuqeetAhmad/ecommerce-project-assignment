import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProductList } from '../../components/card/ProductList';
import { ProductServices } from '../../services/product.service';
import { useParams } from 'react-router-dom';

export const ProductListPage: FC = () => {
  const [data, setData] = useState();
  const { category = '', subCategory = '' } = useParams();

  useEffect(() => {
    ProductServices.GetBaseProductByCategory(category, subCategory)
      .then((response: any) => {
        setData(response?.data?.data.SubCategories[0].BaseProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid className="p-5 min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Container fluid="lg">
            <ProductList data={data} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
