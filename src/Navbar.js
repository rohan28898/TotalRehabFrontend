import React from 'react';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
	const withouSidebarRoutes = ["404", "/signin", "/etc"];

	const { pathname } = useLocation();
	if (withouSidebarRoutes.some((item) => pathname.includes(item)))
		return null;
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to='/' activeStyle>
						About
					</NavLink>
					<NavLink to='/events' activeStyle>
						Events
					</NavLink>
					<NavLink to='/annual' activeStyle>
						Annual Report
					</NavLink>
					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
