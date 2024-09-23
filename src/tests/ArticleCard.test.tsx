import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../lib/store/store";
import { ArticleCard } from "../ui/components";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";

const mockArticle = {
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
};

describe("ArticleCard", () => {
	it("renders the article title and author", () => {
		render(
			<Provider store={store}>
				<ArticleCard data={mockArticle} />
			</Provider>
		);

		expect(screen.getByText("Sample Article")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("toggles favorite status on button click", () => {
		render(
			<Provider store={store}>
				<ArticleCard data={mockArticle} />
			</Provider>
		);

		const button = screen.getByRole("button", { name: /add to favorites/i });
		fireEvent.click(button);
		expect(button).toHaveAttribute("aria-label", "Remove from favorites");
	});

	it("is accessible", async () => {
		const { container } = render(
			<Provider store={store}>
				<ArticleCard data={mockArticle} />
			</Provider>
		);

		const results = await axe(container);
		expect(results.violations.length).toBe(0);
	});
});
