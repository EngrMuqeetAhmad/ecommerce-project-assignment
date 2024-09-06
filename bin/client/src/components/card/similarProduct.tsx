import { FC } from 'react';
import { Col, Container, Image, Row, Stack } from 'react-bootstrap';
import Test from '../../assets/images/test1.jpg';
export const SimilarProduct: FC = () => {
  const data = {
    title: 'Men T Shirt',
    price: '$75',
  };
  return (
    <>
      <Container className="shadow-sm border border-black rounded p-0 w-75 position-relative">
        <Row className=" ">
          <Col xs={6} md={4} className=" ps-4 pe-2 p-2">
            <Image
              src={Test}
              alt={data.title}
              thumbnail
              style={{ height: '70px' }}
            />
          </Col>
          <Col xs={6} md={8}>
            <Stack
              direction="vertical"
              className="p-2 d-flex justify-content-start align-items-start"
            >
              <h2 className="fs-6 display-6 fw-semibold ">{data.title}</h2>
              <span className="text-muted">{data.price}</span>
            </Stack>
          </Col>
        </Row>
        <div
          className="bg-dark position-absolute h-100 end-0 top-0 translate rounded-end"
          style={{ width: '7px' }}
        ></div>
      </Container>
    </>
  );
};
