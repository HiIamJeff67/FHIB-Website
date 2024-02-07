import React from 'react';
import { Link } from "react-router-dom";
import "./HomeButton.css";
import { HiMiniHome } from "react-icons/hi2";

const HomeButton = (props) => {
  return (
    <Link className='homebtn-container' to={"/"} onClick={() => props.setSidebarState(false)}>
      <HiMiniHome size={30} className='home-icon'/>
      <p className='home-title'>Home</p>
    </Link>
  )
}

export default HomeButton;