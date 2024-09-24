import React from "react";

interface LoaderProps {
	size: "sm" | "md" | "lg";
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
	return (
		<p role="status" className={`loader`}>
			<span className="sr-only">Loading...</span>

			<span className={`loader__item loader__item-${size}`} />
		</p>
	);
};

export default Loader;
