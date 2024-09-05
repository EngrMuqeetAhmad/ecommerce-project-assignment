import { FC } from 'react';
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { useNavigate } from 'react-router-dom';

export const Footer: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container
        fluid
        className="d-flex-col mt-4  justify-content-center align-items-center text-white p-0 bg-dark rounded-top shadow-sm"
        style={{ zIndex: '-1' }}
      >
        <Row className="d-flex display-6  fs-1 justify-content-center text-center  rounded-top p-3">
          Ecommerce
        </Row>
        <Row className="d-flex justify-content-center text-center  p-2">
          <Col xs={12} md={{ span: '4', offset: '2' }} className=" mb-3">
            <Stack
              direction="vertical"
              className="w-100"
              gap={3}
              style={{ cursor: 'pointer' }}
            >
              <h1 className="display-6 fs-3">Quick Links</h1>
              <Stack
                direction="vertical"
                gap={3}
                className="align-items-center"
              >
                <span className="w-25" onClick={() => navigate('/')}>
                  Home
                </span>

                <span className="w-25" onClick={() => navigate('/cart')}>
                  Cart
                </span>

                <span className="w-25" onClick={() => navigate('/wishes')}>
                  Wished
                </span>

                <span className="w-25" onClick={() => navigate('/blog')}>
                  Blog
                </span>
              </Stack>
            </Stack>
          </Col>
          <hr className="d-md-none" />
          <Col xs={12} md={6}>
            <Stack
              direction="vertical"
              gap={3}
              className="d-flex-col justify-content-center align-items-center"
            >
              <h1 className="display-6 fs-3">Contact Us</h1>
              <Col xs={10} md={6}>
                <Form noValidate onSubmit={() => {}}>
                  <Stack direction="vertical" gap={3}>
                    <FormGroup className="position-relative">
                      <FormControl
                        type="email"
                        size="sm"
                        placeholder="Email"
                        className="border-light"
                      />
                      <Feedback type="invalid" tooltip>
                        error
                        {/* {errors.email?.message} */}
                      </Feedback>
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <FormControl
                        type="text"
                        as="textarea"
                        placeholder="Message"
                        rows={4}
                        className="border-light"
                        style={{
                          resize: 'none',
                        }}
                      />
                      <Feedback type="invalid" tooltip>
                        error
                        {/* {errors.email?.message} */}
                      </Feedback>
                    </FormGroup>
                  </Stack>
                </Form>
              </Col>
            </Stack>
          </Col>
        </Row>
        <Row className="d-flex font-monospace fw-5  justify-content-center text-center  p-3">
          Designed & Built by Muqeet Ahmad
        </Row>
      </Container>
    </>
  );
};
