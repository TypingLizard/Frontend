/**
 * Project: Typing_Lizard_Frontend
 * Author : Alexander Friedl
 * Date : 12.06.2024
 * Time : 10:50
 */

import React from 'react';
import Link from "next/link";


const Register = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Register</h1>
            <form style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input type="text" id="username" name="username" style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" id="password" name="password" style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" id="email" name="email" style={styles.input}/>
                </div>
                <div >
                    <button style={styles.button}><Link href="/login">Back to login</Link>
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
};

export default Register;