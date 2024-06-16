/**
 * Project: Typing_Lizard_Frontend
 * Author : Alexander Friedl
 * Date : 16.06.2024
 * Time : 14:16
 */

"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

interface IAuthContext {
    username: string;
    setUsername: (username: string) => void;
    token: string | undefined;
    setToken: (token: string) => void;
    error: string | undefined;
    setError: (error: string) => void;
}

const AuthContext = createContext<IAuthContext>({
    username: '',
    setUsername: () => {},
    token: '',
    setToken: () => {},
    error: '',
    setError: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const cookies = parseCookies();
    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string | undefined>(cookies.token);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if (token) {
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        } else {
            destroyCookie(null, 'token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ username, setUsername, token, setToken, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;