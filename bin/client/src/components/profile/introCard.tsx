import { Col, Container, Image, Row, Stack } from 'react-bootstrap';
import Test from '../../assets/images/test1.jpg';
import { UserOutput } from '../../types';

export const IntroCard = () => {
  const user: UserOutput = JSON.parse(`${localStorage.getItem('user')}`);
  return (
    <>
      <Container>
        <Row className="mb-0">
          <Col className="p-4 justify-content-center align-items-center d-flex">
            <Image
              src={Test}
              alt="profile image"
              roundedCircle
              height="150px"
            />
          </Col>
        </Row>
        <Row>
          <Col className="p-3 justify-content-center align-items-center d-flex">
            <Stack
              gap={1}
              direction="vertical"
              className=" justify-content-center align-items-center d-flex"
            >
              <span className="display-6 fs-3  text-capitalize">
                {user.firstName} {user.secondName}
              </span>
              <Stack
                gap={0}
                direction="vertical"
                className=" justify-content-center align-items-center d-flex"
              >
                <span className="text-muted fs-5">{user.email}</span>
                <span className="text-muted fs-5"> {user.role}</span>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};
