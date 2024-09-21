import React from "react";
import { SearchIcon } from "../../assets";

const Searchbar: React.FC = () => {
	return (
		<div className="searchbar">
			<div className="searchbar__inner">
				<div className="searchbar__top">
					<h1 className="logo">
						<span className="text-orange">My</span>
						<span>News</span>
					</h1>
					<button className="searchbar__menu-btn">
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
				<form className="searchbar__form">
					<input
						id="search"
						name="search"
						placeholder="Search news"
						className="searchbar__input"
					/>
					<span className="searchbar__search-icon">
						<SearchIcon />
					</span>
					<button type="submit" className="btn-primary searchbar__btn">
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default Searchbar;
