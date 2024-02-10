import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router';
import './Layout.css';

import Sidebar from './components/Sidebar/Sidebar';

const Layout = () => {
	const location = useLocation();
	const [sidebarDisplay, setSidebarDisplay] = useState(false);
	const [backgroundDim, setBackgroundDim] = useState(false);

	useEffect(() => {
		setBackgroundDim(sidebarDisplay);
	},[sidebarDisplay]);

	useEffect(() => {
		setSidebarDisplay(backgroundDim);
	}, [backgroundDim]);

  return (
		<>
			{location.pathname === "/"
				? (<div className='home-container'>
						<div className={`bg-dim ${backgroundDim ? "onDim" : ""}`}></div>
						<Sidebar setSidebarState={setSidebarDisplay} sidebarState={sidebarDisplay} />
						<div className='dimer' onClick={() => setBackgroundDim(false)}></div>
						<Outlet />
					</div>)
				: (<div className='layout-container'>
						<div className='background-blur-container'>
							{backgroundDim && <div className={`bg-dim ${backgroundDim ? "onDim" : ""}`}></div>}
							<Sidebar setSidebarState={setSidebarDisplay} sidebarState={sidebarDisplay} />
							{backgroundDim && <div className='dimer' onClick={() => setBackgroundDim(false)}></div>}
							<Outlet />
						</div>
					</div>)
			}
		</>
  )
}

export default Layout