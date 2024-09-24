import React, { useEffect, useState } from "react";
import { MainWrapper } from "../ui/wrappers";
import { getApiKey, getBaseUrl, itemsPerPage } from "../lib/helpers";
import { useAppSelector } from "../lib/hooks";
import { ArticleObj, NewsResponse } from "../lib/types";
import { ArticlesList, FavoritesList, MobileSwiper } from "../ui/containers";

const Homepage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);
	const [showFavorites, setShowFavorites] = useState<boolean>(false);

	const searchTerm = useAppSelector((state) => state.globalData.searchTerm);
	const [page, setPage] = useState<number>(1);
	const [totalResults, setTotalResults] = useState<number>(0);

	//refresh newsList wheneve searchTerm changes
	useEffect(() => {
		async function fetchNews() {
			const baseUrl = getBaseUrl();
			const apiKey = getApiKey();
			try {
				const res = await fetch(
					`${baseUrl}/top-headlines?apiKey=${apiKey}&country=us&page=${page}&pageSize=${
						itemsPerPage + 1
					}&q=${searchTerm}`
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
					setTotalResults(data.totalResults);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchNews();
	}, [searchTerm, page]);

	//reset showFavorites when searchTerm changes
	useEffect(() => {
		if (searchTerm !== "") {
			setShowFavorites(false);
		}
	}, [searchTerm]);

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
			<MobileSwiper
				loading={loading}
				newsList={newsList}
				totalResults={totalResults}
				page={page}
				setPage={setPage}
			/>

			{/* Desktop & Tablet view */}
			{showFavorites ? (
				<FavoritesList />
			) : (
				<ArticlesList
					loading={loading}
					newsList={newsList}
					withLatestNews={true}
					hideOnMobile={true}
					totalResults={totalResults}
					page={page}
					setPage={setPage}
				/>
			)}
		</MainWrapper>
	);
};

export default Homepage;
