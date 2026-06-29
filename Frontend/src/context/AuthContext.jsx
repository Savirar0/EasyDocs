import React from 'react'
import {jwtDecode} from 'jwt-decode'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(()=>{
        const storedToken = localStorage.getItem('access_token');
        if(storedToken){
            const decodedToken = jwtDecode(storedToken);
            setToken(storedToken);
            setRole(decodedToken['role']);
        }else{
            setToken(null);
            setRole(null);
        }
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default AuthContext
