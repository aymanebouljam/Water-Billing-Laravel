import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function Auth({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); 
    }, []);

    if (isAuthenticated === null) return null; 

    return isAuthenticated ? children : <Navigate to='/login' />;
}

export default Auth;
