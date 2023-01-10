import '../styles/AuthPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { login, authorisation } from '../store/reducers/AuthActionCreator';

function AuthPage() {
  const { error, isAuth } = useTypedSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(authorisation());
  }, [dispatch]);
  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  useEffect(() => {
    if (error) console.log('wrong login or password');
  }, [error]);

  const onLogin = async (e: any) => {
    e.preventDefault();
    await dispatch(login(nickname, password));
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
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
            New customer? <Link to={'/registration'}>Start here</Link>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={onLogin}
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}

export default AuthPage;
