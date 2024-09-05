import { FC } from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import { ProductTypes } from '../../types/product.types';
import { useNavigate } from 'react-router-dom';

export const ProductCard: FC<ProductTypes> = ({
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
          className="text-decoration-underline"
          onClick={() => navigate(`product/${category}/${subCategory}/${id}`)}
          style={{ cursor: 'pointer' }}
        >
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>

        <Card.Link className="d-flex w-100" onClick={() => {}}>
          <Stack direction="horizontal" className="w-100" gap={2}>
            <Button variant="primary" className="w-100">
              Add to Cart
            </Button>
            <Button variant="outline-dark" className="">
              <i className="far fa-heart"></i>
            </Button>
          </Stack>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
