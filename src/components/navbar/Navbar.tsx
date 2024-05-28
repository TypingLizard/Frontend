import React from 'react';
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div>Logo</div>
            <div>
                <Link href={"/account"}>Account</Link>
                <Link href={"/settings"}>Settings</Link>
                <Link href={"/about"}>About</Link>
            </div>
        </div>
    );
};

export default Navbar;