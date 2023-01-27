import { useEffect } from 'react';
import BasketList from '../components/BasketList';
import { useAppDispatch } from '../hooks/redux';
import { authorisation } from '../store/reducers/user/AuthActionCreator';
import '../styles/HomePage.css';

function BasketPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authorisation());
  }, []);
  return (
    <div className="content__container">
      <div className="basket_title">Basket</div>
      <BasketList />
    </div>
  );
}

export default BasketPage;
