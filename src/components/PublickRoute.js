import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({
  children,
  restricted = false,
  redirectTo = '/',
}) => {
  const isLogged = useSelector(state => state.auth.isLogged);
  const shouldRedirect = isLogged && restricted;
  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : children}</>;
};
