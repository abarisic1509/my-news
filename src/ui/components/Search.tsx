import React, { useEffect } from "react";
import { SearchIcon } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { setSearchTerm } from "../../lib/store/globalDataSlice";
import { useLocation } from "react-router-dom";

interface SearchProps {
	withButton?: boolean;
}

const Search: React.FC<SearchProps> = ({ withButton }) => {
	const { pathname } = useLocation();
	const searchTerm = useAppSelector((state) => state.globalData.searchTerm);
	const dispatch = useAppDispatch();

	//reset searchTerm whenever pathname changes
	useEffect(() => {
		dispatch(setSearchTerm(""));
	}, [pathname]);

	return (
		<form className="search__form">
			<input
				id="search"
				name="search"
				placeholder="Search news"
				className="search__input"
				value={searchTerm}
				onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
