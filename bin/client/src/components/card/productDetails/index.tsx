import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Product } from './porduct';
import { ProductInformaion } from './ProductInformation';
import Test from '../../../assets/images/test1.jpg';
import { ImageType, VariationType } from '../../../types/product.types';

const data: VariationType = {
  variations: [
    {
      name: 'Size',
      values: ['S', 'M', 'L', 'XL'],
    },
    {
      name: 'Color',
      values: ['Red', 'Green', 'Blue'],
    },
  ],
};

const images: ImageType = {
  images: [`${Test}`, `${Test}`, `${Test}`, `${Test}`, `${Test}`, `${Test}`],
};

export const ProductPage: FC = () => {
  return (
    <>
      <Container className="p-2">
        <br />
        <br />
        <Product images={images} data={data} />
        <hr />
        <ProductInformaion
          description="Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men."
          variations={data.variations}
        />
      </Container>
    </>
  );
};
