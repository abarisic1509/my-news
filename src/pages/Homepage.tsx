import React, { useEffect, useState } from "react";
import { MainWrapper } from "../ui/wrappers";
import { getApiKey, getBaseUrl } from "../lib/helpers";
import { useAppSelector } from "../lib/hooks";
import { ArticleObj, NewsResponse } from "../lib/types";
import { ArticlesList, FavoritesList, MobileSwiper } from "../ui/containers";

const Homepage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);
	const [showFavorites, setShowFavorites] = useState<boolean>(false);

	const searchTerm = useAppSelector((state) => state.globalData.searchTerm);

	//refresh newsList wheneve searchTerm changes
	useEffect(() => {
		fetchNews();
	}, [searchTerm]);

	async function fetchNews() {
		const baseUrl = getBaseUrl();
		const apiKey = getApiKey();
		try {
			const res = await fetch(
				`${baseUrl}/top-headlines?apiKey=${apiKey}&country=us&pageSize=100&q=${searchTerm}`
			);
			if (res.ok) {
				const data: NewsResponse = await res.json();
				setNewsList(
					data.articles
						.filter(
							(item) => !item.title.includes("[Removed]") && item.urlToImage
						)
						.map((item) => item)
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<MainWrapper>
			<div className="page-content__intro mobile-hidden">
				<h2>{showFavorites ? "Favorites" : "News"}</h2>
				<button
					className="btn-neutral"
					onClick={() => setShowFavorites((prev) => !prev)}
				>
					{showFavorites ? "Back to news" : "Favorites"}
				</button>
			</div>
			{/* Mobile view */}
			<MobileSwiper loading={loading} newsList={newsList} />

			{/* Desktop & Tablet view */}
			{showFavorites ? (
				<FavoritesList />
			) : (
				<ArticlesList
					loading={loading}
					newsList={newsList}
					withLatestNews={true}
					hideOnMobile={true}
				/>
			)}
		</MainWrapper>
	);
};

export default Homepage;
