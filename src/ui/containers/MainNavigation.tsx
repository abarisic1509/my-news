import React from "react";
import {
	BusinessIcon,
	HealthIcon,
	HomeIcon,
	NewsIcon,
	ScienceIcon,
	SportsIcon,
	TvGuideIcon,
} from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { Search } from "../components";

interface MainNavigationProps {
	isActive: boolean;
	isVisible: boolean;
	handleMenu: () => void;
}
interface LinkItem {
	id: string;
	title: string;
	href: string;
	icon: React.ReactNode;
}

const links: LinkItem[] = [
	{
		id: "general",
		title: "General",
		href: "/general",
		icon: <NewsIcon />,
	},
	{
		id: "business",
		title: "Business",
		href: "/business",
		icon: <BusinessIcon />,
	},
	{
		id: "health",
		title: "Health",
		href: "/health",
		icon: <HealthIcon />,
	},
	{
		id: "science",
		title: "Science",
		href: "/science",
		icon: <ScienceIcon />,
	},
	{
		id: "sports",
		title: "Sports",
		href: "/sports",
		icon: <SportsIcon />,
	},
	{
		id: "technology",
		title: "Technology",
		href: "/technology",
		icon: <TvGuideIcon />,
	},
];

const MainNavigation: React.FC<MainNavigationProps> = ({
	isActive,
	isVisible,
	handleMenu,
}) => {
	const { pathname } = useLocation();

	return (
		<nav
			data-testId="main-nav"
			className={`nav ${isActive ? "active" : ""} ${
				isVisible ? "visible" : ""
			}`}
		>
			<button
				aria-expanded={isVisible}
				className="nav__btn"
				onClick={handleMenu}
			>
				<span className="sr-only">Close menu</span>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<rect
						x="2.82812"
						width="24"
						height="4"
						rx="1"
						transform="rotate(45 2.82812 0)"
						fill="#1D1D1B"
					/>
					<rect
						y="16.9707"
						width="24"
						height="4"
						rx="1"
						transform="rotate(-45 0 16.9707)"
						fill="#1D1D1B"
					/>
				</svg>
			</button>
			<h6 className="nav__logo">
				<span className="text-orange">My</span>
				<span>News</span>
			</h6>
			<Search />
			<ul className="nav__list">
				<li onClick={handleMenu}>
					<Link
						to={"/"}
						className={`nav__link ${pathname === "/" ? "active" : ""}`}
					>
						<HomeIcon />
						<span>Home</span>
					</Link>
				</li>
				{links.map((item: LinkItem) => (
					<li key={item.id} onClick={handleMenu}>
						<Link
							to={item.href}
							className={`nav__link ${pathname === item.href ? "active" : ""}`}
						>
							{item.icon}
							<span>{item.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MainNavigation;
