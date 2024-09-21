import React from "react";
import { SearchIcon } from "../../assets";

interface SearchProps {
	withButton?: boolean;
}

const Search: React.FC<SearchProps> = ({ withButton }) => {
	return (
		<form className="search__form">
			<input
				id="search"
				name="search"
				placeholder="Search news"
				className="search__input"
			/>
			<span className="search__search-icon">
				<SearchIcon />
			</span>
			{withButton && (
				<button type="submit" className="btn-primary search__btn">
					Search
				</button>
			)}
		</form>
	);
};

export default Search;
