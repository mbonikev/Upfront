import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null); // Initialize with null
    const [username, setUserName] = useState(null); // Initialize with null

    useEffect(() => {
        const email = localStorage.getItem('upfront_user');
        const name = localStorage.getItem('upfront_user_name');
        if (email) {
            setUser(true);
            setUserName(name)
        } else {
            setUser(false);
            setUserName('')
        }
    }, []);

    
    if (user === null) {
        return <></>;
    }

    return user ? <Outlet context={{ username }} /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedRoutes;
