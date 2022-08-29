import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.user.name);
  const isLogged = useSelector(state => state.auth.isLogged);

  return (
    <>
      {isLogged && (
        <div className={s.container}>
          <span className={s.name}>Вітаю, {name}</span>
          <button
            type="button"
            className={s.button}
            onClick={() => dispatch(logOut())}
          >
            Вийти
          </button>
        </div>
      )}
    </>
  );
};
