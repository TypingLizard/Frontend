import React from 'react';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><a href="/account">Account</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;