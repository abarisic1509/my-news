import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LatestNews from "./LatestNews";
import { ArticleObj } from "../../lib/types";
import ArticlesList from "./ArticlesList";
import FavoritesList from "./FavoritesList";

interface MobileSwiperProps {
	loading: boolean;
	newsList: ArticleObj[];
	totalResults: number;
	page: number;
	setPage: (page: number) => void;
}

interface PaginationItem {
	id: number;
	title: string;
}

const paginationsItems: PaginationItem[] = [
	{
		id: 1,
		title: "Featured",
	},
	{
		id: 2,
		title: "Latest",
	},
	{
		id: 3,
		title: "Favorites",
	},
];

const MobileSwiper: React.FC<MobileSwiperProps> = ({
	loading,
	newsList,
	totalResults,
	page,
	setPage,
}) => {
	const [instance, setInstance] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperRef>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);

	//reset page when active slider changes
	useEffect(() => {
		if (activeIndex === 0 || activeIndex === 2) {
			setPage(1);
		}
	}, [activeIndex, setPage]);

	//reset scroll position of current slide when page changes
	useEffect(() => {
		if (instance && instance.slides) {
			if (activeIndex === 0 || activeIndex === 2) {
				const activeSlide = instance?.slides[activeIndex];
				if (activeSlide) {
					setTimeout(() => {
						activeSlide.scrollTo(0, 0);
					}, 150);
				}
			}
		}
	}, [instance, page, activeIndex]);

	const handlePaginationClick = (index: number) => {
		if (swiperRef.current && instance) {
			instance?.slideTo(index);
		}
	};
	return (
		<div className="mobile-swiper">
			<ul className="mobile-swiper__pagination">
				{paginationsItems.map((item: PaginationItem, i: number) => (
					<li
						key={item.id}
						className={`mobile-swiper__pagination-btn ${
							activeIndex === i ? "active" : ""
						}`}
						aria-current={activeIndex === i ? "true" : "false"}
						role="button"
						onClick={() => handlePaginationClick(i)}
						data-testid="swiper-buttons"
					>
						{item.title}
					</li>
				))}
			</ul>

			<Swiper
				ref={swiperRef}
				onSwiper={setInstance}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				modules={[Pagination]}
				autoplay={false}
			>
				<SwiperSlide>
					<ArticlesList
						loading={loading}
						newsList={newsList}
						totalResults={totalResults}
						page={page}
						setPage={setPage}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<LatestNews />
				</SwiperSlide>
				<SwiperSlide>
					<FavoritesList page={page} setPage={setPage} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default MobileSwiper;
