import { UserMenu } from 'components/UserMenu/UserMenu';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/authOperations';
import s from './Register.module.css';

export const Register = () => {
  const dispatch = useDispatch();
  const isRegisterOk = useSelector(({ auth }) => auth.isRegisterOk);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка реєстрації</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <label>
          <p>Ім'я</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className={s.textbox}
          />
        </label>

        <label>
          <p>Пошта</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={s.textbox}
            placeholder={
              isRegisterOk ? '' : 'користувач з такою поштою вже існує'
            }
          />
        </label>

        <label className={s.label}>
          <p>Пароль</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={s.textbox}
          />
        </label>

        <button type="submit" className={s.button}>
          Зареєструватися
        </button>
      </form>
      <UserMenu />
    </div>
  );
};
