import React, { useRef, useState } from "react";
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
}

const paginationsItems = [
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

const MobileSwiper: React.FC<MobileSwiperProps> = ({ loading, newsList }) => {
	const [instance, setInstance] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperRef>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const handlePaginationClick = (index: number) => {
		if (swiperRef.current && instance) {
			instance?.slideTo(index);
		}
	};
	return (
		<div className="mobile-swiper">
			<ul className="mobile-swiper__pagination">
				{paginationsItems.map((item, i) => (
					<li
						key={item.id}
						className={`mobile-swiper__pagination-btn ${
							activeIndex === i ? "active" : ""
						}`}
						role="button"
						onClick={() => handlePaginationClick(i)}
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
					<ArticlesList loading={loading} newsList={newsList} />
				</SwiperSlide>
				<SwiperSlide>
					<LatestNews />
				</SwiperSlide>
				<SwiperSlide>
					<FavoritesList />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default MobileSwiper;
