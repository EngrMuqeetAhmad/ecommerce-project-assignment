import { AxiosResponse } from 'axios';
import { FC, useEffect } from 'react';
import { UserServices } from '../../services/user.service';
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';

export const Red: FC = () => {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  console.log('hello redirect');
  useEffect(() => {
    const fnc = async () => {
      const response: AxiosResponse = await UserServices.red(token);
      console.log(response);
      if (response.status == 200) {
        console.log('redirectin');
        navigate(`/reset/y/${token}`, { replace: true });
        return;
      }
    };
    fnc();
  }, []);

  return (
    <>
      <div>wait redirecting</div>
    </>
  );
};
