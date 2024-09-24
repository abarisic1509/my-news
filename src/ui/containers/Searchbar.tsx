import React from "react";
import { Search } from "../components";

interface SearchbarProps {
	isVisible: boolean;
	handleMenu: () => void;
}
const Searchbar: React.FC<SearchbarProps> = ({ isVisible, handleMenu }) => {
	return (
		<header className="searchbar">
			<div className="searchbar__inner">
				<div className="searchbar__top">
					<h1 className="logo">
						<span className="text-orange">My</span>
						<span>News</span>
					</h1>
					<button
						data-testid="menu-btn-open"
						name="Toggle menu"
						className="searchbar__menu-btn"
						aria-expanded={isVisible}
						onClick={handleMenu}
					>
						<span className="sr-only">Open menu</span>
						<svg
							aria-hidden="true"
							width="24"
							height="21"
							viewBox="0 0 24 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect y="0.5" width="24" height="4" rx="1" fill="#1D1D1B" />
							<rect y="8.5" width="24" height="4" rx="1" fill="#1D1D1B" />
							<rect y="16.5" width="24" height="4" rx="1" fill="#1D1D1B" />
						</svg>
					</button>
				</div>
				<Search withButton={true} />
			</div>
		</header>
	);
};

export default Searchbar;
