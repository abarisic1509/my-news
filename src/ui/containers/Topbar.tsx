import React from "react";

const Topbar: React.FC = () => {
	return (
		<div className="topbar">
			<div className="topbar__inner">
				<div className="topbar__intro">
					<h6 className="topbar__title">Make MyNews your homepage</h6>
					<p className="topbar__description">
						Every day discover what's trending on the internet
					</p>
				</div>
				<div className="topbar__cta">
					<button className="topbar__btn btn-ghost">No, thanks</button>
					<button className="topbar__btn btn-neutral">Get</button>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
