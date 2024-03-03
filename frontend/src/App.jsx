import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Provider from './context/Provider';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/main",
    element: <Main/>,
  },
  {
    path: "/register",
    element: <Register/>,
  }
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;