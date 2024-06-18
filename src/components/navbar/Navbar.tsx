import React from 'react';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><a href="/login">Account</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;