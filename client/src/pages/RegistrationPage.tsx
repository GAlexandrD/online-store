import '../styles/AuthPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { registration } from '../store/reducers/AuthActionCreator';

function RegistrationPage() {
  const { error, isAuth, isPanding } = useTypedSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth]);

  useEffect(() => {
    if (error) console.log('change nickname');
  }, [error]);
  const onRegistration = (e: any) => {
    e.preventDefault();
    dispatch(registration(nickname, password));
  };
  return (
    <div className="body">
      <main className="form-signin w-100 m-auto">
        <form>
          <img
            className="mb-4"
            src="./img/logo.jpg"
            alt=""
            width="70"
            height="70"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={nickname}
              onChange={(e: any) => setNickname(e.target.value)}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <div>
            Have accaunt? <Link to={'/login'}>login here</Link>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={onRegistration}
          >
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}

export default RegistrationPage;
