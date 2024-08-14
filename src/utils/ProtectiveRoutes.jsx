import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null); // Initialize with null
    const [username, setUserName] = useState(null); // Initialize with null
    const [userEmail, setUserEmail] = useState(null)

    useEffect(() => {
        const email = localStorage.getItem('upfront_user');
        const name = localStorage.getItem('upfront_user_name');
        if (email) {
            setUser(true);
            setUserName(name)
            setUserEmail(email)
        } else {
            setUser(false);
            setUserName(null)
            setUserEmail(null)
        }
    }, []);

    
    if (user === null) {
        return <></>;
    }

    return user ? <Outlet context={{ username, userEmail }} /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedRoutes;
