import React from "react";
import { ArticleObj } from "../../lib/types";
import LatestNews from "./LatestNews";
import { ArticleCard, Loader } from "../components";

interface ArticlesListProps {
	loading?: boolean;
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
							{newsList.map((item, i) => (
								<React.Fragment key={`${item.articleId}-${i}`}>
									<ArticleCard data={item} />
								</React.Fragment>
							))}
							{withLatestNews && <LatestNews />}
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
