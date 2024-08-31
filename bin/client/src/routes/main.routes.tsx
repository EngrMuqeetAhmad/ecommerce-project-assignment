import { RouteObject, useRoutes } from 'react-router-dom';
import { LogIn } from '../pages/login/login';
import { FC } from 'react';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';

const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    index: true
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: '*',
    element: <div>404 not found</div>,
  },
];

const AppRoutes: FC = () => {
  return useRoutes(mainRoutes);
};

export default AppRoutes;
