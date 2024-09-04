import { FC } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import TEST from '../../assets/images/test1.jpg';
export const CartProduct: FC = () => {
  return (
    <>
      <Card className="shadow-sm">
        <Row>
          <Col
            xs={12}
            md={3}
            className="d-flex-col justify-content-center align-items-center"
          >
            <Image fluid src={TEST} alt="product" />
          </Col>
          <Col xs={12} md={6}>
            <Card.Body className="d-flex-col  justify-content-center align-items-center">
              <Card.Title className="mb-3 text-center">
                Men Dress Shirt
              </Card.Title>
              <Container fluid className="">
                <Row className="justify-content-center">
                  <Col
                    xs={3}
                    md={1}
                    className="d-flex justify-content-center fw-bold"
                  >
                    Size
                  </Col>
                  <Col
                    xs={3}
                    md={1}
                    className="d-flex justify-content-center fw-bold"
                  >
                    Color
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={3} md={1} className="d-flex justify-content-center">
                    S
                  </Col>
                  <Col xs={3} md={1} className="d-flex justify-content-center">
                    Red
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Col>
          <Col
            xs={12}
            md={3}
            className="d-flex justify-content-center align-items-center"
          >
            
          </Col>
        </Row>
      </Card>
    </>
  );
};
