"use client";

import { useContext } from 'react';
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { FieldValues, useForm } from "react-hook-form";
import axios from 'axios';
import { setCookie } from 'nookies';
axios.defaults.baseURL = "http://localhost:8080";

const Login = () => {
    const { username, setUsername, token, setToken, error, setError } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await axios.post('/api/v1/auth/authenticate', data);
            const { token, username } = response.data;

            setUsername(username);

            console.log("username = " +username)
            console.log("token = " + token)

            setToken(token);
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            // Redirect to a protected route or home page
            window.location.href = '/';
        } catch (err) {
            setError('Authentication failed. Please try again.');
        }

        console.log(token)
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Login</h1>
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input type="text" id="username" style={styles.input} {...register("username")} />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" id="password" style={styles.input} {...register("password")} />
                </div>
                <div>
                    <button type="submit" style={styles.button}>Login</button>
                    <button style={styles.button}>
                        <Link href="/register">Register now</Link>
                    </button>
                </div>
            </form>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#333',
        color: '#FFD700',
    },
    header: {
        fontSize: '2.5em',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '1.2em',
    },
    input: {
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1em',
        color: '#333',
        backgroundColor: '#FFD700',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: 10,
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default Login;
