import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { LogIn } from '../pages/login/login';
import { FC } from 'react';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';
import { VerificationEmail } from '../pages/reset/verificationEmail';
import { ChangePassword } from '../pages/reset/changePassword';
import { Red } from '../pages/reset/redirect';
import { Error } from '../components/Error/Error';

const AppRoutes: FC = () => {
  const user = JSON.parse(`${localStorage.getItem('user')}`);

  const mainRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
      index: true,
    },
    {
      path: '/login',
      element:
        user == null ? (
          <LogIn />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/login', message: 'You are already logged In' }}
          />
        ),
    },
    {
      path: '/error',
      element: <Error />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/reset',
      element: <VerificationEmail />,
    },
    {
      path: '/reset/:token',
      element: <Red />,
    },
    {
      path: '/reset/y/:token',
      element: <ChangePassword />,
    },
    {
      path: '*',
      element: <div>404 not found</div>,
    },
  ];

  return useRoutes(mainRoutes);
};

export default AppRoutes;
