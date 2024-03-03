import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../utils/postAPI';
import context from '../context/context';

function Register() {
  const { setUser, ...client } = useContext(context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useNavigate();

  const ROUTE = useMemo(() => 'common_register', []);

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

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <form>
        <div className="input-with-label">
          <label htmlFor="id">
            Email
            <input
              name="email"
              data-testid={ `${ROUTE}__input-email` }
              type="email"
              id="email"
              placeholder="seu-email@site.com.br"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              required
            />
          </label>
        </div>
        <div className="input-with-label">
          <label htmlFor="password">
            Senha
            <input
              placeholder="**********"
              data-testid={ `${ROUTE}__input-password` }
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
            className="btn"
            type="button"
            data-testid={ `${ROUTE}__button-register` }
            disabled={ disabled }
            onClick={ register }
          >
            Cadastrar
          </button>
        </div>
      </form>
      {
        client.message === 'User already exists' && (
          <div className="message">
            <span data-testid={ `${ROUTE}__element-invalid_register` }>
              {client.message}
            </span>
          </div>
        )
      }
    </div>
  );
}

export default Register;