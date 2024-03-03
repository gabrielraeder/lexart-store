import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import { readLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const STORAGE_KEY = 'user';

const initialState = {
  id: '',
  email: '',
  token: '',
  message: null,
};

export default function Provider({ children }) {
  const [state, setState] = useState(readLocalStorage(STORAGE_KEY, initialState)
  || initialState);
  const { token, email, id } = state;


  const setUser = (user) => { setState((prevState) => ({ ...prevState, ...user })); };

  const resetUser = async () => setState(initialState);

  const handleLogout = () => {
    resetUser();
    saveToLocalStorage({}, STORAGE_KEY);
  }

  useMemo(() => {
    if (token) saveToLocalStorage({ token, email, id }, STORAGE_KEY);
  }, [token, email, id]);

  const context = useMemo(() => ({ ...state, setUser, resetUser, handleLogout }), [state]);

  return (
    <Context.Provider value={ context }>{children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};