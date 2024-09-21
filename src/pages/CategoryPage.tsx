import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainWrapper } from "../ui/wrappers";
import { ArticleObj, NewsResponse } from "../lib/types";
import { useAppSelector } from "../lib/hooks";
import { getApiKey, getBaseUrl } from "../lib/helpers";

const CategoryPage = () => {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [newsList, setNewsList] = useState<ArticleObj[]>([]);

	const searchTerm = useAppSelector((state) => state.search.searchTerm);

	//refresh newsList wheneve searchTerm changes
	useEffect(() => {
		fetchNews();
	}, [searchTerm, params]);

	async function fetchNews() {
		const baseUrl = getBaseUrl();
		const apiKey = getApiKey();
		try {
			const res = await fetch(
				`${baseUrl}/top-headlines?apiKey=${apiKey}&country=us&category=${params.id}&pageSize=100&q=${searchTerm}`
			);
			if (res.ok) {
				const data: NewsResponse = await res.json();
				setNewsList(
					data.articles.filter(
						(item) => !item.title.includes("[Removed]") && item.urlToImage
					)
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
			<section className="page-content">
				<div className="page-content__intro">
					<h2 style={{ textTransform: "capitalize" }}>{params.id} news</h2>
					<button className="btn-neutral">Favorites</button>
				</div>
				<div className="page-content__articles-list">
					{loading ? (
						<p>Loading...</p>
					) : (
						<>
							{newsList.map((item, i) => (
								<article key={`${item.publishedAt}-${i}`} className="article">
									<div className="article__image">
										<img src={item.urlToImage} alt="" />
									</div>
									<div className="article__content">
										<h3 className="article__title">{item.title}</h3>
										<p className="article__author">{item.author}</p>
									</div>
								</article>
							))}
						</>
					)}
				</div>
			</section>
		</MainWrapper>
	);
};

export default CategoryPage;
