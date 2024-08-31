import { RouteObject, useRoutes } from 'react-router-dom';
import { LogIn } from '../pages/login/login';
import { FC } from 'react';

const mainRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LogIn />,
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
