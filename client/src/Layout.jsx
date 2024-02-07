import React from 'react';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router';
import './Layout.css';

import Sidebar from './components/Sidebar/Sidebar';

const Layout = () => {
	const location = useLocation();

  return (
		<>
			{location.pathname === "/"
				? (<div className='home-container'>
						<Sidebar />
						<Outlet />
					</div>)
				: (<div className='layout-container'>
						<div className='background-blur-container'>
							<Sidebar />
							<Outlet />
						</div>
					</div>)
			}
		</>
  )
}

export default Layout