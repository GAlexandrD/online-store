import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/redux';
import { useAppDispatch } from '../hooks/redux';
import DeviceList from './DeviceList';
import { fetchBasket } from '../store/reducers/user/BasketActions';
import { Link } from 'react-router-dom';
import '../styles/list.css';

const BasketList: FC = () => {
  const { devices, id, isAuth } = useTypedSelector((state) => ({
    ...state.basketReducer,
    ...state.userReducer,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(fetchBasket(id));
  }, [id, dispatch]);
  return (
    <>
      {!isAuth ? (
        <div className="basketNone__container">
          <h3>Plz sing in to see your basket</h3>
          <Link to="/">
            <h2>go to store</h2>
          </Link>
        </div>
      ) : (
        <div className="list__container">
          <DeviceList devices={devices.rows} />
        </div>
      )}
    </>
  );
};
export default BasketList;
