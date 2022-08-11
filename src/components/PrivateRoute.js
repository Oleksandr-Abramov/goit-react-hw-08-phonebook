// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(state => state.auth.token);

  // console.log('~ isLogged', isLogged);

  return isLogged ? children : <Navigate to="/" replace={true} />;
};
