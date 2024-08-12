import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectIfNeeded = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem('upfront_user') || '';
    const verifyUser = async () => {
      if (email === '' || location.pathname === '/auth/signup') {
        navigate('/auth/login');
      } else {
        try {
          const response = await axios.get('http://localhost:5000/api/verify', {
            params: { email }
          });
          // Handle successful verification if needed
        } catch (error) {
          console.log(error);
          navigate('/auth/login');
        }
      }
    };

    verifyUser();
  }, [navigate, location.pathname]);

  return null; // This component does not render anything
};

export default RedirectIfNeeded;
