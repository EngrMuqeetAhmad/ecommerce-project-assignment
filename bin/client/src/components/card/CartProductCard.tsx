import { FC } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Stack,
} from 'react-bootstrap';
import TEST from '../../assets/images/test1.jpg';

export const CartProductCard: FC = () =>
  // { product, onRemove, onUpdateQuantity }
  {
    const { id, title, price, quantity, image } = {
      id: 1,
      title: 'Men Shirt',
      price: 200,
      quantity: 2,
      image: '',
    };

    return (
      <Card className="mb-3">
        <Row className="g-0 position-relative">
          <Col md={4}>
            <Card.Img
              src={TEST}
              alt={title}
              style={{ objectFit: 'cover', maxHeight: '200px' }}
            />
          </Col>
          <Col md={8} className="">
            <Card.Body className="">
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="text-muted">
                ${price.toFixed(2)}
              </Card.Subtitle>
              <Card.Text className="text-muted p-0">
                S \ RED \ VAIRANT..
              </Card.Text>
              <Stack
                direction="horizontal"
                gap={3}
                className="d-flex justify-content-start align-items-center"
              >
                <Button variant="danger" size="sm">
                  <i className="fas fa-trash-alt text-white"></i>
                </Button>
                <div className="vr"></div>
                <Stack direction="horizontal" gap={1}>
                  <Button
                    variant="outline-dark"
                    // onClick={() => onUpdateQuantity(id, quantity + 1)}
                    size="sm"
                  >
                    -
                  </Button>
                  <span className="d-flex ps-3 pe-3 p-1 rounded bg-light justify-content-center align-items-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline-dark"
                    // onClick={() => onUpdateQuantity(id, quantity - 1)}
                    size="sm"
                    disabled={quantity <= 1}
                  >
                    +
                  </Button>
                </Stack>
              </Stack>
            </Card.Body>
          </Col>
        </Row>
        <div
          className="bg-dark position-absolute h-100 end-0 top-0 translate rounded-end"
          style={{ width: '10px' }}
        ></div>
      </Card>
    );
  };
