import React, { useEffect } from "react";
import { itemsPerPage } from "../../lib/helpers";

interface PaginationProps {
	totalResults: number;
	page: number;
	setPage: (page: number) => void;
	isHomepage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
	totalResults,
	page,
	setPage,
	isHomepage,
}) => {
	const totalPages: number = isHomepage
		? Math.ceil(totalResults / (itemsPerPage + 1))
		: Math.ceil(totalResults / itemsPerPage);
	const pageNumbers: number[] = Array.from(
		{ length: totalPages },
		(_, i) => i + 1
	);

	//reset scroll position whenever page changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	return (
		<ul className="pagination">
			<li>
				<button
					className="pagination__btn"
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					aria-label="Previous Page"
				>
					Prev
				</button>
			</li>
			{pageNumbers.map((pageNum: number) => (
				<li key={pageNum}>
					<button
						data-testid="pagination-btn"
						className={`pagination__btn ${pageNum === page ? "active" : ""}`}
						onClick={() => setPage(pageNum)}
						aria-label={`Go to Page ${pageNum}`}
						aria-current={page === pageNum ? "page" : undefined}
					>
						{pageNum}
					</button>
				</li>
			))}
			<li>
				<button
					className="pagination__btn"
					onClick={() => setPage(page + 1)}
					disabled={page === totalPages}
					aria-label="Next Page"
				>
					Next
				</button>
			</li>
		</ul>
	);
};

export default Pagination;
