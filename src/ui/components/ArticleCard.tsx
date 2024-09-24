import React from "react";
import { ArticleObj } from "../../lib/types";
import { convertToLocalTime } from "../../lib/helpers";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
	addFavorite,
	isFavorite,
	removeFavorite,
} from "../../lib/store/globalDataSlice";
import { StarFilledIcon, StarIcon } from "../../assets";

interface ArticleCardProps {
	data: ArticleObj;
	isCompact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ data, isCompact }) => {
	const dispatch = useAppDispatch();
	const isInFavorites = useAppSelector((state) =>
		isFavorite(state.globalData, data)
	);

	const toggleFavorite = () => {
		if (isInFavorites) {
			dispatch(removeFavorite(data));
		} else {
			dispatch(addFavorite(data));
		}
	};

	if (isCompact) {
		// return latest news item
		return (
			<article className="latest-news_article">
				<p>{data.publishedAt ? convertToLocalTime(data.publishedAt) : ""}</p>
				<h4>
					<a href={data.url} target="_blank" rel="noopener noreferrer">
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
					<a href={data.url} target="_blank" rel="noopener noreferrer">
						{data.title}
					</a>
				</h3>
				<p className="article__author">{data.author}</p>
			</div>
			<button
				className="article__favorite-btn"
				onClick={toggleFavorite}
				aria-label={
					isInFavorites ? "Remove from favorites" : "Add to favorites"
				}
				aria-pressed={isInFavorites}
			>
				{isInFavorites ? <StarFilledIcon /> : <StarIcon />}
			</button>
		</article>
	);
};

export default ArticleCard;
