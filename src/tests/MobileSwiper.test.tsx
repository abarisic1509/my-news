import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MobileSwiper } from "../ui/containers";
import { Provider } from "react-redux";
import { store } from "../lib/store/store";

// Mock the components to isolate testing
vi.mock("../ui/components/ArticlesList", () => {
	return function MockArticlesList({ loading }: { loading: boolean }) {
		return (
			<div data-testid="articles-list">
				{loading ? "Loading..." : "Articles Loaded"}
			</div>
		);
	};
});

vi.mock("../ui/components/LatestNews", () => {
	return () => <div data-testid="latest-news">Latest News</div>;
});

vi.mock("../ui/components/FavoritesList", () => {
	return () => <div data-testid="favorites-list">Favorites List</div>;
});
Object.defineProperty(window, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

HTMLCanvasElement.prototype.getContext = vi.fn();

describe("MobileSwiper", () => {
	const mockNewsList = [
		{
			title: "Sample Article",
			url: "https://example.com",
			author: "John Doe",
			publishedAt: "2023-09-01T00:00:00Z",
			urlToImage: "https://example.com/image.jpg",
			source: {
				id: "id",
				name: "Source",
			},
			description: "Some desc",
			content: "Some content",
		},
	];
	const totalResults = 35;
	const page = 1;
	const setPage = vi.fn();

	beforeEach(() => {
		render(
			<Provider store={store}>
				<MobileSwiper
					loading={false}
					newsList={mockNewsList}
					totalResults={totalResults}
					page={page}
					setPage={setPage}
				/>
			</Provider>
		);
	});

	it("renders pagination buttons", () => {
		const buttons = screen.getAllByTestId("swiper-buttons");
		expect(buttons).toHaveLength(3); // Should be 3 buttons
		expect(buttons[0]).toHaveTextContent("Featured");
		expect(buttons[1]).toHaveTextContent("Latest");
		expect(buttons[2]).toHaveTextContent("Favorites");
	});

	it("changes active slide on pagination click", async () => {
		const buttons = screen.getAllByTestId("swiper-buttons");

		// Click on the "Latest" button
		fireEvent.click(buttons[1]);

		// Check if the correct button is active
		expect(buttons[1]).toHaveClass("active");
		expect(buttons[0]).not.toHaveClass("active");
		expect(buttons[2]).not.toHaveClass("active");

		// Click on the "Favorites" button
		fireEvent.click(buttons[2]);

		// Check if the correct button is active
		expect(buttons[2]).toHaveClass("active");
		expect(buttons[0]).not.toHaveClass("active");
		expect(buttons[1]).not.toHaveClass("active");
	});
});
