import { FC } from 'react';
import { Col, Container, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { IntroCard } from '../../components/profile/introCard';
import { AddCategory } from '../../components/dashboard/category/addCategory';
import AddSubCategory from '../../components/dashboard/category/addSubCategory';
import BaseProductForm from '../../components/dashboard/product/baseProduct';
import { ProductVariationForm } from '../../components/dashboard/product/productVariation';
import { VariationTypeForm } from '../../components/dashboard/product/variationType';
import { VariationTypeValueForm } from '../../components/dashboard/product/typeValue';

export const DashBoard: FC = () => {
  return (
    <>
      <Container className="mt-5">
        <Tab.Container defaultActiveKey="user">
          <Row>
            <Col
              xs={12}
              md={4}
              className="shadow rounded-3 p-3 border border-light"
            >
              <Container>
                <IntroCard />
                <Nav variant="pills" className="flex-column  ">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="user">Category</Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="shippingAddress">
                          Sub Category
                        </Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="paymentMethod">
                          Base Product
                        </Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="variationType">
                          Variation Type
                        </Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="TypeValue">Type Value</Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="productVariation">
                          Product Varitions
                        </Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                  </ListGroup>
                </Nav>
              </Container>
            </Col>
            <Col xs={12} md={8}>
              <Container>
                <Tab.Content className="d-flex justify-content-center">
                  <Tab.Pane eventKey="user">
                    <AddCategory />
                  </Tab.Pane>
                  <Tab.Pane eventKey="shippingAddress">
                    <AddSubCategory />
                  </Tab.Pane>
                  <Tab.Pane eventKey="paymentMethod">
                    <BaseProductForm />
                  </Tab.Pane>
                  <Tab.Pane eventKey="variationType">
                    <VariationTypeForm />
                  </Tab.Pane>
                  <Tab.Pane eventKey="TypeValue">
                    <VariationTypeValueForm />
                  </Tab.Pane>
                  <Tab.Pane eventKey="productVariation">
                    <ProductVariationForm />
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};
