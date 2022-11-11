import { useAuth } from '../store';
import { Outlet, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Fragment>
      {isAuthenticated ? <Outlet /> : <Navigate to="/" replace />}
    </Fragment>
  );
};

export default PrivateRoute;
