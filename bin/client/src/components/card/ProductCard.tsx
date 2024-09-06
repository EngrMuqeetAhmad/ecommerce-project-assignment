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
          className="fs-5 fw-semibold"
          onClick={() => navigate(`product/${category}/${subCategory}/${id}`)}
          style={{ cursor: 'pointer' }}
        >
          {title}
        </Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>

        <Card.Link
          className="d-flex w-100 text-decoration-none"
          onClick={() => {}}
        >
          <Stack direction="horizontal" className="w-100" gap={2}>
            <Button variant="dark" className="w-100">
              Go To Product
            </Button>
          </Stack>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
