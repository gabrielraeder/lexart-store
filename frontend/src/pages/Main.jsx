import MyNavbar from '../components/Navbar';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../context/context';
import CardList from '../components/CardList';
import { getAPI } from '../utils/handleAPI';
import AddButton from '../components/AddButton';

function Main() {
  const { token } = useContext(context);
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (currentData) setLoading(false);
  }, [currentData]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          history('/');
        } else {
          await getAPI('/product', (res) => {
            setCurrentData(res);
          }, token);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      {
        loading ? 
        <div>LOADING...</div> : 
        <>
          <MyNavbar/>
          <CardList data={currentData} editData={setCurrentData}/>
          <AddButton editData={setCurrentData}/>
        </>
        
      }
      
    </>
  );
}

export default Main;
