import React from 'react'
import "./UserContentButton.css";
import { FaUserLarge } from "react-icons/fa6";

const UserContentButton = () => {

  return (
    <div className='userbtn-container'>
      <FaUserLarge className='user-icon'/>
      <p className='user-title'>User</p>
    </div>
  )
}

export default UserContentButton