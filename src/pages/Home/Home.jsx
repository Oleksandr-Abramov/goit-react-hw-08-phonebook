import { useSelector } from 'react-redux';

export const Home = () => {
  const stateHome = useSelector(state => state);
  console.log('~ stateHome', stateHome);
  return <h2>Зареєструйтеся, або авторизуйтесь для продовження</h2>;
};
