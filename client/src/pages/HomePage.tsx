import { useEffect } from 'react';
import StoreFilter from '../components/StoreFilter';
import StoreList from '../components/StoreList';
import { useAppDispatch } from '../hooks/redux';
import { authorisation } from '../store/reducers/user/AuthActionCreator';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/redux';

function HomePage() {
  const { isAuth } = useTypedSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authorisation());
  }, []);
  return (
    <div className="content__container">
      <StoreFilter />
      <StoreList />
      {isAuth ? (
        <img
          className="basket__button"
          src="./img/logo.jpg"
          alt=""
          onClick={() => navigate('/basket')}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default HomePage;
