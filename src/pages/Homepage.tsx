import { useEffect, useState } from "react";
import { MainWrapper } from "../ui/wrappers";
import { getApiKey, getBaseUrl } from "../lib/helpers";
import { useAppSelector } from "../lib/hooks";
import { ArticleObj, NewsResponse } from "../lib/types";
import { ArticlesList, MobileSwiper } from "../ui/containers";
import { nanoid } from "nanoid";

const Homepage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);

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
						.map((item) => ({ ...item, articleId: nanoid() }))
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
				<h2>News</h2>
				<button className="btn-neutral">Favorites</button>
			</div>
			{/* Mobile view */}
			<MobileSwiper loading={loading} newsList={newsList} />

			{/* Desktop & Tablet view */}
			<ArticlesList
				loading={loading}
				newsList={newsList}
				withLatestNews={true}
				hideOnMobile={true}
			/>
		</MainWrapper>
	);
};

export default Homepage;
