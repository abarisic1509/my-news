import React from "react";
import { ArticleObj } from "../../lib/types";
import { convertToLocalTime } from "../../lib/helpers";

interface ArticleCardProps {
	data: ArticleObj;
	isCompact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ data, isCompact }) => {
	if (isCompact) {
		// return latest news item
		return (
			<article className="latest-news_article">
				<p>{data.publishedAt ? convertToLocalTime(data.publishedAt) : ""}</p>
				<h4>
					<a href={data.url} target="_blank">
						{data.title}
					</a>
				</h4>
			</article>
		);
	}

	//otherwise return regular article card
	return (
		<article className="article">
			<div className="article__image">
				<img src={data.urlToImage} alt="" />
			</div>
			<div className="article__content">
				<h3 className="article__title">
					<a href={data.url} target="_blank">
						{data.title}
					</a>
				</h3>
				<p className="article__author">{data.author}</p>
			</div>
		</article>
	);
};

export default ArticleCard;
