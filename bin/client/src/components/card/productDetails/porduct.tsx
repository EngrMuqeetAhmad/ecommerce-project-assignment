import { FC, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { FormSelect } from './formSelect';
import { QuantityCounter } from '../../counter/quantityCounter';
import { ImageGallery } from '../../imageGallery/ImageGallary';

export const Product: FC<any> = ({ images, data }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Container className="shadow-sm border border-light rounded">
        <Row>
          <Col xs={12} md={6} className="mb-4">
            <ImageGallery images={images.images} />
            {/* <Container>
                            <Row className="mb-3" >
                                <Col>
                                    <Image src={Test} alt="Men T shirt" thumbnail />
                                </Col>

                            </Row>
                            <Row className="" >
                                <Stack direction="horizontal" gap={2} className="justify-content-center align-items-center d-flex" >
                                    {
                                        Array.from({ length: 4 }).map(() => (
                                            <Image src={Test} alt="Men T shirt" height="70px" style={{ cursor: "pointer" }} />
                                        ))
                                    }
                                </Stack>
                            </Row>
                        </Container> */}
          </Col>
          <hr className="d-block d-md-none" />
          <Col xs={12} md={6} className="p-4">
            <Stack direction="vertical" gap={1}>
              <Stack direction="vertical" gap={2}>
                <h1 className="fs-2">Quality Men's Hoodie for Winter</h1>
                <span className="fw-semibold text-muted">$75/per box</span>
                <p>
                  Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men.
                </p>
              </Stack>
              <hr />
              <Stack direction="vertical" gap={1}>
                <FormSelect variations={data.variations} />
                <hr />
                <QuantityCounter
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </Stack>
              <hr />
              <Stack direction="horizontal" gap={3} className="">
                <Button variant="dark" className="w-75">
                  Add to Cart
                </Button>
                <Button variant="outline-dark" className="w-25">
                  <i className="far fa-heart"></i>
                </Button>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};
