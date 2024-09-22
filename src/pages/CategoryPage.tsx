import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainWrapper } from "../ui/wrappers";
import { ArticleObj, NewsResponse } from "../lib/types";
import { useAppSelector } from "../lib/hooks";
import { getApiKey, getBaseUrl } from "../lib/helpers";
import { ArticlesList } from "../ui/containers";

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
				</div>
				<ArticlesList loading={loading} newsList={newsList} />
			</section>
		</MainWrapper>
	);
};

export default CategoryPage;
