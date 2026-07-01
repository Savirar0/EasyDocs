import React from 'react'
import {jwtDecode} from 'jwt-decode'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    useEffect(()=>{
        const storedToken = localStorage.getItem('access_token');
        if(storedToken){
            const decodedToken = jwtDecode(storedToken);
            setToken(storedToken);
            setRole(decodedToken['role']);
            setCompanyId(decodedToken['company_id'])
        }else{
            setToken(null);
            setRole(null);
        }
    }, [])

    const loginUser = async(username, password) => {
        try{
            const response = await fetch("http://127.0.0.1:8000/api/token/",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok){
                const data = await response.json();
                const accessToken = data.access;
                const decoded = jwtDecode(accessToken);

                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", data.refresh);

                setToken(accessToken);
                setRole(decoded.role);
                setCompanyId(decoded.company_id);

                return {success: true};
            }else{
                return {
                    success: false, error: "Invalid username or password"
                };
            }
        }catch(err){
            return {
                success: false, error:"Server is unreachable"
            };
        }
    } 

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setCompanyId(null);
        setRole(null);
        setToken(null);
    }

  return (
    
    <AuthContext.Provider value={{token, role, companyId, loginUser, logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
};

export default AuthContext
export const useAuth = () => React.useContext(AuthContext);