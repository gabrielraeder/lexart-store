import { useContext, useEffect, useState } from 'react';
import context from '../context/context';
import postAPI from '../utils/postAPI';
import { useNavigate } from 'react-router-dom';

function Form() {
  const { setUser } = useContext(context);

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const MIN_PASSWORD_CHARACTERS = 6;
    const EMAIL_REGEXP = /^[\w.]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/gi;
    setDisabled(!(
      (password.length >= MIN_PASSWORD_CHARACTERS)
      && (EMAIL_REGEXP.test(email))));
  }, [email, password]);

  const login = () => {
    postAPI('/user', (user) => {
      setUser(user)
      if (user.token) history('/main');
    }, { email, password });
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && !disabled) {
      login();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEnterKey);
    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, [disabled, login]);

  return (
    <form className="login_form">
      <div className="input_with_label">
        <label htmlFor="login_input_email">
          Email
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="email@trybeer.com.br"
            onChange={ ({ target: { value } }) => setEmail(value) }
            id="login_input_email"
          />
        </label>
      </div>
      <div className="input_with_label">
        <label htmlFor="login_input_password">
          Password
          <input
            type="password"
            name="password"
            placeholder="**********"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            id="login_input_password"
          />
        </label>
      </div>
      <div className="login_buttons">
        <button
          className="login_btn"
          type="button"
          disabled={ disabled }
          onClick={ login }
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={ () => history('/register') }
          className="register_btn"
        >
          Register
        </button>
      </div>
    </form>
  );
}

const style = {
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '425px',
};

export default function Login() {
  const { message } = useContext(context);

  return (
    <div className="login_container" style={ style }>
      <Form />
      {
        message
        && (
          <div className="message">
            <span data-testid="common_login__element-invalid-email">
              {message}
            </span>
          </div>)
      }
    </div>
  );
}