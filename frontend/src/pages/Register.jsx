import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../utils/postAPI';
import context from '../context/context';

function Register() {
  const { setUser, ...client } = useContext(context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const MIN_PASSWORD_CHARACTERS = 6;
    const EMAIL_REGEXP = /^[\w.]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/gi;
    setDisabled(!(
      (password.length >= MIN_PASSWORD_CHARACTERS)
      && (EMAIL_REGEXP.test(email))));
  }, [email, password]);

  useEffect(() => {
    if (client.email) history('/main');
  }, [client, history]);

  const register = async () => {
    await postAPI(
      '/user/create',
      (data) => {
        setUser(data);
        history('/main');
      },
      { email, password },
    );
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && !disabled) {
      register();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEnterKey);
    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, [disabled, register]);

  return (
    <div className="register_container">
      <h1>Create your account</h1>
      <form className="login_form">
        <div className="input_with_label">
          <label htmlFor="id">
            Email
            <input
              name="email"
              type="email"
              id="email"
              placeholder="seu-email@site.com.br"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              required
            />
          </label>
        </div>
        <div className="input_with_label">
          <label htmlFor="password">
            Password
            <input
              placeholder="**********"
              name="password"
              type="password"
              id="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              required
            />
          </label>
        </div>
        <div>
          <button
            className="register_btn"
            type="button"
            disabled={ disabled }
            onClick={ register }
          >
            Register
          </button>
        </div>
      </form>
      {
        client.message === 'User already exists' && (
          <div className="message">
            <span>
              {client.message}
            </span>
          </div>
        )
      }
    </div>
  );
}

export default Register;