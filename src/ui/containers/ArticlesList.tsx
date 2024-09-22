import React from "react";
import { ArticleObj } from "../../lib/types";
import LatestNews from "./LatestNews";

interface ArticlesListProps {
	loading: boolean;
	newsList: ArticleObj[];
	withLatestNews?: boolean;
	hideOnMobile?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
	loading,
	newsList,
	withLatestNews,
	hideOnMobile,
}) => {
	return (
		<div
			className={`page-content__articles-list ${
				hideOnMobile ? "mobile-hidden" : ""
			}`}
		>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{withLatestNews && <LatestNews />}
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
	);
};

export default ArticlesList;
