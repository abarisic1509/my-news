import React from "react";
import { ArticleObj } from "../../lib/types";
import LatestNews from "./LatestNews";
import { ArticleCard, Loader, NoResults, Pagination } from "../components";

interface ArticlesListProps {
	loading?: boolean;
	newsList: ArticleObj[];
	withLatestNews?: boolean;
	hideOnMobile?: boolean;
	totalResults: number;
	page: number;
	setPage: (page: number) => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
	loading,
	newsList,
	withLatestNews,
	hideOnMobile,
	totalResults,
	page,
	setPage,
}) => {
	return (
		<>
			<div
				data-testid="articles-list"
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
								{newsList.map((item: ArticleObj, i: number) => (
									<React.Fragment key={`${item.articleId}-${i}`}>
										<ArticleCard data={item} />
									</React.Fragment>
								))}
								{withLatestNews && <LatestNews />}
							</>
						) : (
							<NoResults />
						)}
					</>
				)}
			</div>
			{newsList.length > 0 && (
				<Pagination
					totalResults={totalResults}
					page={page}
					setPage={setPage}
					isHomepage={withLatestNews}
				/>
			)}
		</>
	);
};

export default ArticlesList;
