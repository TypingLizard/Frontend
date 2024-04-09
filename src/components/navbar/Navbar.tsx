import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <div>
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