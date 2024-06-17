/**
 * Project: Typing_Lizard_Frontend
 * Author : Alexander Friedl
 * Date : 12.06.2024
 * Time : 10:50
 */

"use client"

import React, { useContext } from 'react';
import Link from "next/link";
import axios from 'axios';
import AuthContext from '@/context/AuthContext';
import {FieldValues, useForm} from "react-hook-form";
import {setCookie} from "nookies";
axios.defaults.baseURL = "http://localhost:8080";

const Register = () => {


    // get the context
    const { username, setUsername, token, setToken, error, setError } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();



    const onSubmit = async (data: FieldValues) => {
        try {
            // use axois to create an post request
            const response = await axios.post('/api/v1/auth/register', data);
            const token = response.data.token;



            // set the infos in the context so its usable
            setToken(token);
            setUsername(username);
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            window.location.href = '/';
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Register</h1>
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input type="text" id="username" style={styles.input}  {...register("username")} />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" id="password"  style={styles.input}  {...register("password")} />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" id="email" style={styles.input} {...register("email")} />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <div>
                    <button style={styles.button}>
                        <Link href="/login">Back to login</Link>
                    </button>
                    <button type="submit" style={styles.button}>Register</button>
                </div>
            </form>
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
        marginBottom: 10,
        padding: '10px 20px',
        fontSize: '0.9em',
        color: '#333',
        backgroundColor: '#FFD700',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: 5
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    }
};

export default Register;
