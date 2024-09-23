import React from "react";
import { MainWrapper } from "../ui/wrappers";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<MainWrapper>
			<div className="not-found">
				<h2 className="text-orange">404</h2>
				<p>Page you are looking for does not exist</p>

				<Link className="btn-primary" to={"/"}>
					Home
				</Link>
			</div>
		</MainWrapper>
	);
};

export default NotFound;
