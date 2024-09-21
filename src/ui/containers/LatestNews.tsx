import React, { useEffect, useState } from "react";
import { convertToLocalTime, getApiKey, getBaseUrl } from "../../lib/helpers";
import { ArticleObj, NewsResponse } from "../../lib/types";

const LatestNews: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [resultsCount, setResultsCount] = useState<number>(0);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);

	useEffect(() => {
		fetchLatestNews();
	}, []);

	async function fetchLatestNews() {
		const baseUrl = getBaseUrl();
		const apiKey = getApiKey();
		try {
			const res = await fetch(
				`${baseUrl}/everything?apiKey=${apiKey}&sources=the-hill,abc-news,the-washington-post,associated-press,espn,nbc-news,business-insider&sortBy=publishedAt&pageSize=100`
			);
			if (res.ok) {
				const data: NewsResponse = await res.json();
				setResultsCount(data.totalResults);
				setNewsList(data.articles);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<aside className="latest-news">
			<h3 className="latest-news__title">Latest news</h3>

			<ul className="latest-news__list">
				{loading ? (
					<li>Loading..</li>
				) : (
					<>
						{newsList.map((item, i) => (
							<li key={`${item.publishedAt}-${i}`}>
								<article className="latest-news_article">
									<p>
										{item.publishedAt
											? convertToLocalTime(item.publishedAt)
											: ""}
									</p>
									<h4>{item.title}</h4>
								</article>
							</li>
						))}
					</>
				)}
			</ul>
		</aside>
	);
};

export default LatestNews;
