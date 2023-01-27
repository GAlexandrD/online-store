import React from 'react';
import { FC } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { logout } from '../store/reducers/user/AuthActionCreator';
import { Button } from 'react-bootstrap';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const { isAuth, email, isPanding, role } = useTypedSelector(
    (store) => store.userReducer
  );
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const signIn = () => {
    Navigate('/login');
  };
  const signOut = () => {
    dispatch(logout());
  };
  const signUp = () => {
    Navigate('/registration');
  };
  const homePage = () => {
    Navigate('/');
  };
  return (
    <div className="Navbar">
      <div className="Navbar__content">
        <div onClick={homePage} className="Navbar__logo">
          <img className="Navbar__logo_image" src="./img/logo.jpg" alt="" />
          <span
            className="Navbar__logo_text"
            onPointerOver={(e) => e.preventDefault()}
          >
            Shop
          </span>
        </div>
        {isAuth ? (
          <div className="profile__container">
            <div className="profile">
              <span className="profile__text">{email}</span>
              {role === 'ADMIN' ? (
              <Button
                variant="danger"
                className="adminPannel__button_entry"
                onClick={() => Navigate('/admin-pannel')}
              >
                Admin Panel
              </Button>
            ) : (
              <></>
            )}
            </div>
            <button
              className="Navbar__button Navbar__button_signup"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        ) : isPanding ? (
          <div></div>
        ) : (
          <div>
            <button
              className="Navbar__button Navbar__button_signin"
              onClick={signIn}
            >
              Sign in
            </button>
            <button
              className="Navbar__button Navbar__button_signup"
              onClick={signUp}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
