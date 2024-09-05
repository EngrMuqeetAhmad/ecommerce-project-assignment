import { FC } from 'react';
import { Button, Card, Col, Stack } from 'react-bootstrap';
import { ProductTypes } from '../../types/product.types';
import { useNavigate } from 'react-router-dom';

export const WishProductCard: FC<ProductTypes> = ({
  image,
  title,
  description,
  id,
  category,
  subCategory,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        onClick={() => navigate(`product/${category}/${subCategory}/${id}`)}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body>
        <Card.Title
          onClick={() => navigate(`product/${category}/${subCategory}/${id}`)}
         className='fs-5 fw-semibold'
          style={{ cursor: 'pointer' }}
        >
          {title}
        </Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>

        <Col className="" xs={12}>
          <Stack direction="horizontal" className="justify-content-between">
            <Button variant="outline-danger">
              <i className="fas fa-trash-alt"></i>
            </Button>
            <Button variant="outline-dark">
              <i className="fas fa-cart-plus"></i>
            </Button>
          </Stack>
        </Col>
      </Card.Body>
    </Card>
  );
};
