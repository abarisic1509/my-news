import React, { ReactNode } from "react";
import { MainNavigation, Searchbar, Topbar } from "../containers";

interface MainWrapperProps {
	children: ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
	return (
		<div className="main-wrapper">
			<Topbar />
			<main className="content-wrapper">
				<Searchbar />
				<MainNavigation />
				{children}
			</main>
		</div>
	);
};

export default MainWrapper;
