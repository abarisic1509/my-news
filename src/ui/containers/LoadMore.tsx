import { useEffect, useState } from "react";
import { ArticleObj, NewsResponse } from "../../lib/types";
import { useInView } from "react-intersection-observer";
import {
	convertToLocalTime,
	getApiKey,
	getBaseUrl,
	itemsPerPage,
} from "../../lib/helpers";

let page = 2;

const LoadMore = () => {
	const [data, setData] = useState<ArticleObj[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasMore) {
			setTimeout(() => {
				fetchNewPage();
			}, 750);
		}
	}, [inView, hasMore]);

	const fetchNewPage = async () => {
		const baseUrl = getBaseUrl();
		const apiKey = getApiKey();
		const res = await fetch(
			`${baseUrl}/everything?apiKey=${apiKey}&sources=the-hill,abc-news,the-washington-post,associated-press,espn,nbc-news,business-insider&sortBy=publishedAt&page=${page}&pageSize=${itemsPerPage}`
		);
		if (res.ok) {
			const data: NewsResponse = await res.json();
			if (data.articles && data.articles.length > 0) {
				setData((prev) => [...prev, ...data.articles]);
				if (data.articles.length % itemsPerPage !== 0) {
					setHasMore(false);
				}
				page++;
			} else {
				setHasMore(false);
			}
		}
	};

	return (
		<>
			{/* Fetched data */}

			{data &&
				data?.length > 0 &&
				data?.map((item: ArticleObj, i: number) => (
					<li key={`${item.publishedAt}-${i}`}>
						<article className="latest-news_article">
							<p>
								{item.publishedAt ? convertToLocalTime(item.publishedAt) : ""}
							</p>
							<h4>{item.title}</h4>
						</article>
					</li>
				))}

			{/* Loader */}
			{hasMore && (
				<div ref={ref} role="status" aria-label="Loading more">
					Loading...
				</div>
			)}
		</>
	);
};

export default LoadMore;
