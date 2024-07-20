import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('token')
    );

    const navigate = useNavigate();
    const login = (token: string, userInfo: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
};