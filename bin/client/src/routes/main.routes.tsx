import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { LogIn } from '../pages/login/login';
import { FC } from 'react';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';
import { VerificationEmail } from '../pages/reset/verificationEmail';
import { ChangePassword } from '../pages/reset/changePassword';
import { Red } from '../pages/reset/redirect';
import { Error } from '../components/Error/Error';
import { Cart } from '../pages/cart/cart';
import { Wishes } from '../pages/wishes/wished';
import { ProductDetails } from '../pages/product/productDetails';

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
      path: "/product/:category/:subCategory/:id",
      element: <ProductDetails />
    },
    {
      path: '/cart',
      element:
        user != null ? (
          <Cart />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/cart', message: 'Log In to access cart' }}
          />
        ),
    },
    {
      path: '/wishes',
      element:
        user != null ? (
          <Wishes />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/cart', message: 'Log In to access cart' }}
          />
        ),
    },
    {
      path: '/error',
      element: <Error />,
    },
    {
      path: '/register',
      element:
        user == null ? (
          <Register />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/register', message: 'Logout to access register' }}
          />
        ),
    },
    {
      path: '/reset',
      element:
        user == null ? (
          <VerificationEmail />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/reset', message: 'unauthorized' }}
          />
        ),
    },
    {
      path: '/reset/:token',
      element:
        user == null ? (
          <Red />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/reset', message: 'Unauthorized' }}
          />
        ),
    },
    {
      path: '/reset/y/:token',
      element:
        user == null ? (
          <ChangePassword />
        ) : (
          <Navigate
            to="/error"
            state={{ from: '/reset', message: 'unauthorized' }}
          />
        ),
    },
    {
      path: '*',
      element: <div>404 not found</div>,
    },
  ];

  return useRoutes(mainRoutes);
};

export default AppRoutes;
