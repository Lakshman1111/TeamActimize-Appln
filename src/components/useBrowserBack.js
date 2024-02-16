import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useBrowserBack = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBrowserBack = () => {
      console.log('Browser back button clicked');
      navigate('/home');
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [navigate]);
};
export default useBrowserBack;
