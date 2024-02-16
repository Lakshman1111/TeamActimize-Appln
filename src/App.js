import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Approutes from './Approutes';
import LoginForm from './LoginForm';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate( <LoginForm />);
    }
    if (storedToken && pathname === '/login') {
      setToken(storedToken);
      navigate('/');
    }
  }, [token, navigate, pathname]);

  if (!token) {
    return <LoginForm />;
  }
  return (
    <div className="App">
      <ToastContainer />
      <Approutes />
    </div>
  );
}
export default App;
