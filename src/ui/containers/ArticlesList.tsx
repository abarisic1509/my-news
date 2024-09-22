import React from "react";
import { ArticleObj } from "../../lib/types";
import LatestNews from "./LatestNews";
import { Loader } from "../components";

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
				<Loader size={"lg"} />
			) : (
				<>
					{newsList.length > 0 ? (
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
					) : (
						<p>No results</p>
					)}
				</>
			)}
		</div>
	);
};

export default ArticlesList;
