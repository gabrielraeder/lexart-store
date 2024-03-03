import MyNavbar from '../components/Navbar';
import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import postAPI from '../utils/postAPI';
import context from '../context/context';

function Main() {
  const client = useContext(context);
  const history = useNavigate();

  useEffect(() => {
    if (!client.token) history('/')
  }, [])
  

  return (
    <>
      <MyNavbar/>
    </>
  );
}

export default Main;
