import { UserMenu } from 'components/UserMenu/UserMenu';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import s from './Login.module.css';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoginOk = useSelector(({ auth }) => auth.isLoginOk);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка авторизації</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <label>
          <p>Пошта</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={s.textbox}
            placeholder={isLoginOk ? '' : 'невірний логін або пароль'}
          />
        </label>

        <label>
          <p>Пароль</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={s.textbox}
            placeholder={isLoginOk ? '' : 'невірний логін або пароль'}
          />
        </label>

        <button type="submit" className={s.button}>
          Увійти
        </button>
      </form>
      <UserMenu />
    </div>
  );
};
