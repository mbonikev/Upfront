import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectIfNeeded = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('upfront_user') || '';

        const verifyUser = async () => {
            if (email === '') {
                navigate('/auth/login');
            } else {
                try {
                    const response = await axios.get('http://localhost:5000/api/verify', { email });
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        verifyUser();
    }, [navigate]);

    return null; // This component does not render anything
};

export default RedirectIfNeeded;

