import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export const Error: FC = () => {
  const location = useLocation();

  const { from, message } = location.state || {};
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center align-center w-100 min-vh-100 text-danger"
      >
        {message} from {from}
      </Container>
    </>
  );
};
