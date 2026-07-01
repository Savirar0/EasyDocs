import React, { createContext, useContext } from 'react';

// 1. The pure context data channel slot
export const AuthContext = createContext(null);

// 2. The custom hook to listen to that channel
export const useAuth = () => useContext(AuthContext);