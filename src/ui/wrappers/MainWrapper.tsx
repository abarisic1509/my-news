import React, { ReactNode, useRef, useState } from "react";
import { MainNavigation, Searchbar, Topbar } from "../containers";

interface MainWrapperProps {
	children: ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
	const mainContentRef = useRef<HTMLElement | null>(null);
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

	const handleSkipLink = () => {
		if (mainContentRef.current) {
			mainContentRef.current.removeAttribute("tabindex");
			mainContentRef.current.focus();
		}
	};

	return (
		<div className="main-wrapper">
			<a href="#mainContent" className="skip-link" onClick={handleSkipLink}>
				Skip to content
			</a>
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
				<main
					id="mainContent"
					className="page-content"
					ref={mainContentRef}
					tabIndex={-1}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default MainWrapper;
