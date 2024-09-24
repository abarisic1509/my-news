import React, { useState } from "react";
import { useAppSelector } from "../../lib/hooks";
import ArticlesList from "./ArticlesList";
import { NoResults } from "../components";
import { itemsPerPage } from "../../lib/helpers";
import { ArticleObj } from "../../lib/types";

interface FavoritesListProps {
	page?: number;
	setPage?: (page: number) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ page, setPage }) => {
	const favorites: ArticleObj[] = useAppSelector(
		(state) => state.globalData.favorites
	);
	const [currentPage, setCurrentPage] = useState<number>(page || 1);

	if (favorites.length === 0) return <NoResults />;

	// Calculate the items to display for the current page
	const startIndex: number = (currentPage - 1) * itemsPerPage;
	const endIndex: number = startIndex + itemsPerPage;
	const currentItems: ArticleObj[] = favorites.slice(startIndex, endIndex);

	//helper function for handling page change in both use-cases (mobile and desktop version)
	const handlePageChange = (pg: number): void => {
		setCurrentPage(pg);
		if (setPage) {
			setPage(pg);
		}
	};

	return (
		<ArticlesList
			newsList={currentItems}
			totalResults={favorites.length}
			page={currentPage}
			setPage={handlePageChange}
		/>
	);
};

export default FavoritesList;
