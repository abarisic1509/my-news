import React from "react";
import { useAppSelector } from "../../lib/hooks";
import ArticlesList from "./ArticlesList";

const FavoritesList: React.FC = () => {
	const favorites = useAppSelector((state) => state.globalData.favorites);

	if (favorites.length === 0) return <p>No results</p>;

	return <ArticlesList newsList={favorites} />;
};

export default FavoritesList;
