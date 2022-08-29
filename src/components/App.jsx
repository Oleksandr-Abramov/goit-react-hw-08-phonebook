import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { refreshCurrentUser } from 'redux/auth/authOperations';
import { lazy, Suspense } from 'react';
import s from './App.module.css';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublickRoute';
import { Loader } from './Loader/Loader';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Phonebook = lazy(() => import('../pages/Phonebook'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);
  const isFetchingCurrentUser = useSelector(
    state => state.auth.isFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  return (
    <div className={s.container}>
      {!isFetchingCurrentUser && !isLogged && (
        <nav className={s.navigation}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              s.link + (isActive ? ' ' + s.active : '')
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              s.link + (isActive ? ' ' + s.active : '')
            }
          >
            Register
          </NavLink>
        </nav>
      )}
      {isFetchingCurrentUser && !isLogged ? (
        //
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/phonebook" restricted>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute redirectTo="/phonebook" restricted>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/phonebook"
              element={
                <PrivateRoute>
                  <Phonebook />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
};
