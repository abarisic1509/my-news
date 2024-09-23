import React from "react";

const NoResults: React.FC = () => {
	return (
		<div className="no-results">
			<img src="/not-found.svg" />
			<p>No results found</p>
		</div>
	);
};

export default NoResults;
