/**
 * Noémi Feurer
 */

import React from 'react';
import "./UserLabel.css"
import Image from "next/image";

interface Props {
    username: string;
    profilePic: string;
}

/**
 * UserLabel component which serves as the label for the user on the top of the page
 *
 * @param username The username of the logged-in user
 * @param profilePic The profile pic of the logged-in user
 */
const UserLabel = ({username, profilePic} : Props) => {
    return (
        <div className="userLabel">
            {/* The image component which displays the profile picture. */}
            <Image src={profilePic} width={30} height={30} style={{borderRadius: 30}} alt={"profile"}/>
            {/* Display for the username inline with the profile picture. */}
            <h3>{username}</h3>
        </div>
    );
};

export default UserLabel;