import { FC } from 'react';
import { Col, Container, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { IntroCard } from '../../components/profile/introCard';
import { UserContent } from './user';

export const Profile: FC = () => {
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
                        <Nav.Link eventKey="user">User</Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="shippingAddress">
                          Shipping Address
                        </Nav.Link>
                      </Nav.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="paymentMethod">
                          Payment Method
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
                    <UserContent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="shippingAddress">
                    shippingAddress
                  </Tab.Pane>
                  <Tab.Pane eventKey="paymentMethod">payment methods</Tab.Pane>
                </Tab.Content>
              </Container>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};
