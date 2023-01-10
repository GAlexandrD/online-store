import { useEffect } from 'react';
import BasketList from '../components/BasketList';
import StoreFilter from '../components/StoreFilter';
import { useAppDispatch } from '../hooks/redux';
import { authorisation } from '../store/reducers/AuthActionCreator';
import '../styles/HomePage.css';

function BasketPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authorisation());
  }, []);
  return (
    <div className="content__container">
      <StoreFilter />
      <BasketList />
    </div>
  );
}

export default BasketPage;
