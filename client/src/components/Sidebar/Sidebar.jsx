import React, { useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import "./Sidebar.css";

import UserContentButton from "../UserContentButton/UserContentButton.jsx";
import PathList from "../PathList/PathList.jsx";

const Sidebar = () => {
	const [sidebarDisplay, setSidebarDisplay] = useState(false);

  return (
		<div className={`sidebar-container ${sidebarDisplay ? "" : "hide"}`}>
				<div className='sidebar-content'>
						<UserContentButton />
						<PathList />
				</div>
				<button className='sidebar-shift-button' onClick={() => setSidebarDisplay(!sidebarDisplay)}>
						<GoChevronRight size={20} className={`arrow-icon ${sidebarDisplay ? "arrow-reverse" : "arrow-normal"}`} />
				</button>
		</div>
  )
}

export default Sidebar;