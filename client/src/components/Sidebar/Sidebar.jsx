import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import "./Sidebar.css";

import UserContentButton from "../UserContentButton/UserContentButton.jsx";
import HomeButton from '../HomeButtom/HomeButton.jsx';
import PathList from "../PathList/PathList.jsx";

const Sidebar = (props) => {
	const location = useLocation();
	const [sidebarContentStyle, setSidebarContentStyle] 
		= useState({
			borderRadius: "15px",
    		marginLeft: "10px",
    		padding: "3.5% 0",
    		width: "95%",
    		height: "97.5%",
    		background: "#0c141d",
    		display: "flex",
    		flexDirection: "column",
    		alignItems: "center",
			gap: "1%",
    		color: "white"
		});
	const [sidebarShiftButton, setSidebarShiftButton] 
		= useState({
			zIndex: "99",
    		border: "none",
    		borderRadius: "0 50% 50% 0",
    		padding: "10px",
    		width: "5%",
    		height: "7.5%",
    		background: "#0c141d",
    		color: "white",
    		position: "relative",
    		cursor: "pointer",
		})

	useEffect(() => {
		if (location.pathname !== "/") {
			setSidebarContentStyle(previousStyle => ({
				...previousStyle,
				background: "rgba(255, 255, 255, 0.15)",
			}));
			setSidebarShiftButton(previousStyle => ({
				...previousStyle,
				background: "rgba(255, 255, 255, 0.1)",
			}))
		}
		else {
			setSidebarContentStyle(previousStyle => ({
				...previousStyle,
				background: "#0c141d",
			}))
			setSidebarShiftButton(previousStyle => ({
				...previousStyle,
				background: "#0c141d",
			}))
		}
	},[location])

	useEffect(() => {
		console.log(props.sidebarState);
	},[props.sidebarState])
	
	const hanleSidebarButtonClicking = () => {
		const newSidebarState = !props.sidebarState;
		props.setSidebarState(newSidebarState);
	}

  return (
		<div className={`sidebar-container ${props.sidebarState ? "" : "hide"}`}>
			<div style={sidebarContentStyle}>
				<div className='sidebar-content-top'>
					<UserContentButton />
					<HomeButton setSidebarState={props.setSidebarState} />
				</div>
				<PathList setSidebarState={props.setSidebarState} />
			</div>
			<button style={sidebarShiftButton} onClick={hanleSidebarButtonClicking}>
				<GoChevronRight size={20} className={`arrow-icon ${props.sidebarState ? "arrow-reverse" : "arrow-normal"}`} />
			</button>
		</div>
  )
}

export default Sidebar;