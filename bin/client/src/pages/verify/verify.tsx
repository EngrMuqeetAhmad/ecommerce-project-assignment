import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserServices } from '../../services/user.service';

export const VerifyUser = () => {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  console.log('hello redirect');
  useEffect(() => {
    const fnc = async () => {
      const response: AxiosResponse | AxiosError =
        await UserServices.VerifyUser(token);
      console.log(response);
      if (response.status == 200) {
        console.log('redirectin');
        navigate(`/login`, { replace: true });
        return;
      }
    };
    fnc();
  }, []);
  return (
    <>
      <Container>
        <span>Verifying user.....redirecting</span>
      </Container>
    </>
  );
};
