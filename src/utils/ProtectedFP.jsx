import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedFP = () => {
    const [generatedCode, setGeneratedCode] = useState(null); // Initialize with null

    useEffect(() => {
        const code = localStorage.getItem('fpq-key-code-random');
        if (code) {
            setGeneratedCode(true);
        } else {
            setGeneratedCode(false);
        }
    }, []);

    
    if (generatedCode === null) {
        return <></>;
    }

    return generatedCode ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedFP;
