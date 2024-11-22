import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, ROLE_PERMISSIONS } from '../constants/permissions';
const Store = window.require('electron-store');
const store = new Store();

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Geliştirme aşamasında otomatik giriş
        const mockUser = {
            id: 1,
            username: 'admin',
            role: 'admin'
        };
        setUser(mockUser);

        // Tema tercihini localStorage'dan al
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }

        // Kayıtlı kullanıcı bilgilerini kontrol et
        const savedUser = store.get('user');
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Geliştirme aşamasında basit bir giriş
        if (username === 'admin' && password === 'admin') {
            const mockUser = {
                id: 1,
                username: 'admin',
                role: 'admin'
            };
            setUser(mockUser);
            store.set('user', mockUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        store.delete('user');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        const userRole = user.role;
        const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
        return rolePermissions.includes(permission);
    };

    const value = {
        user,
        login,
        logout,
        theme,
        toggleTheme,
        hasPermission,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
