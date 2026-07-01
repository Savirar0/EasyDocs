import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('access_token') || null;
    });

    const [role, setRole] = useState(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            return decoded.role || null;
        }
        return null;
    });

    const [companyId, setCompanyId] = useState(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            return decoded.company_id || null; 
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
        setRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, companyId, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => React.useContext(AuthContext);
export {AuthProvider, useAuth};