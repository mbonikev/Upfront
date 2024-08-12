import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null); // Initialize with null

    useEffect(() => {
        const email = localStorage.getItem('upfront_user');
        if (email) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, []);

    
    if (user === null) {
        return <></>;
    }

    return user ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedRoutes;
