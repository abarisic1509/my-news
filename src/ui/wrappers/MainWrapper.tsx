import React, { ReactNode } from "react";
import { MainNavigation, Searchbar, Topbar } from "../containers";

interface MainWrapperProps {
	children: ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
	return (
		<div className="main-wrapper">
			<Topbar />
			<Searchbar />
			<div className="content-wrapper">
				<MainNavigation />
				{children}
			</div>
		</div>
	);
};

export default MainWrapper;
