import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './auth'; 

const getStoredAccessToken = () => {
    const storedToken = localStorage.getItem('access_token');
    if (!storedToken) return null;

    try {
        jwtDecode(storedToken);
        return storedToken;
    } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return getStoredAccessToken();
    });

    const [role, setRole] = useState(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            try {
                return jwtDecode(storedToken).role || null;
            } catch {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return null;
    });

    const [companyId, setCompanyId] = useState(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            try {
                return jwtDecode(storedToken).company_id || null;
            } catch {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return null;
    });

    const [companyName, setCompanyName] = useState(()=>{
        const storedToken = localStorage.getItem('access_token');
        if(storedToken){
            try{
                return jwtDecode(storedToken).company_name || null;
            }catch{
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return null;
    });

    const loginUser = async (username, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const accessToken = data.access;
                const decoded = jwtDecode(accessToken);

                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", data.refresh);

                setToken(accessToken);
                setRole(decoded.role);
                setCompanyId(decoded.company_id);
                setCompanyName(decoded.company_name);

                return { success: true };
            } else {
                return { success: false, error: "Invalid username or password" };
            }
        } catch {
            return { success: false, error: "Server is unreachable" };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setCompanyId(null);
        setCompanyName(null);
        setRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, companyId, companyName, isAuthenticated: Boolean(token), loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
