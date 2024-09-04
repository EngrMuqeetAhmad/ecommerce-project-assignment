import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
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
    <Card
      className="shadow-sm"
      onClick={() => navigate(`product/${category}/${subCategory}/${id}`)}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <Card.Link
          className="d-flex w-100 justify-content-end"
          onClick={() => {}}
        >
          <Button variant="primary">
            <i className="fas fa-cart-plus text-white"></i> Add to Cart
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
