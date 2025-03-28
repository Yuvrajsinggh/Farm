import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Hardcoded login function
    const login = (username, password) => {
        // Now i will add api for login 
        setIsAuthenticated(true);
        setUser({ username: 'user', name: 'John Doe' });

    };

    // Hardcoded logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Clear all the asunc storage
        AsyncStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};