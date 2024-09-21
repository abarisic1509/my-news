import React, { ReactNode, useState } from "react";
import { MainNavigation, Searchbar, Topbar } from "../containers";

interface MainWrapperProps {
	children: ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
	const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
	const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);

	const handleMobileMenu = () => {
		if (mobileMenuVisible) {
			setMobileMenuVisible(false);
			setTimeout(() => {
				setMobileMenuActive(false);
			}, 500);
		} else {
			setMobileMenuActive(true);
			setTimeout(() => {
				setMobileMenuVisible(true);
			}, 100);
		}
	};

	return (
		<div className="main-wrapper">
			<Topbar />
			<div className="content-wrapper">
				<Searchbar
					isVisible={mobileMenuVisible}
					handleMenu={handleMobileMenu}
				/>
				<MainNavigation
					isActive={mobileMenuActive}
					isVisible={mobileMenuVisible}
					handleMenu={handleMobileMenu}
				/>
				{children}
			</div>
		</div>
	);
};

export default MainWrapper;
