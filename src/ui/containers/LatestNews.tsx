import React, { useEffect, useState } from "react";
import { getApiKey, getBaseUrl, itemsPerPage } from "../../lib/helpers";
import { ArticleObj, NewsResponse } from "../../lib/types";
import { ArticleCard, Loader } from "../components";
import LoadMore from "./LoadMore";

const LatestNews: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);

	useEffect(() => {
		fetchLatestNews();
	}, []);

	async function fetchLatestNews() {
		const baseUrl = getBaseUrl();
		const apiKey = getApiKey();
		try {
			const res = await fetch(
				`${baseUrl}/everything?apiKey=${apiKey}&sources=the-hill,abc-news,the-washington-post,associated-press,espn,nbc-news,business-insider&sortBy=publishedAt&page=1&pageSize=${itemsPerPage}`
			);
			if (res.ok) {
				const data: NewsResponse = await res.json();
				setNewsList(data.articles);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<aside className={"latest-news"}>
			<h3 className="latest-news__title">Latest news</h3>

			<ul className="latest-news__list">
				{loading ? (
					<li>
						<Loader size={"md"} />
					</li>
				) : (
					<>
						{newsList.map((item, i) => (
							<li key={`${item.publishedAt}-${i}`}>
								<ArticleCard data={item} isCompact={true} />
							</li>
						))}
						<LoadMore />
					</>
				)}
			</ul>
		</aside>
	);
};

export default LatestNews;
