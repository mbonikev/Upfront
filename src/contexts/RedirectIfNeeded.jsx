import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectIfNeeded = () => {
  const navigate = useNavigate();
  const currentPath = location.hash;
  console.log(currentPath)

  useEffect(() => {
    const email = localStorage.getItem('upfront_user') || '';
    const verifyUser = async () => {
      if (email === '' && currentPath !== '#/auth/signup') {
        navigate('/auth/login');
      } else if (email !== '') {
        try {
          const response = await axios.get('http://localhost:5000/api/verify', { email });
        } catch (error) {
          if (currentPath !== '#/auth/signup') {
            navigate('/auth/login');
          }
        }
      }
    };

    verifyUser();
  }, [navigate, location.pathname]);

  return null; // This component does not render anything
};

export default RedirectIfNeeded;
