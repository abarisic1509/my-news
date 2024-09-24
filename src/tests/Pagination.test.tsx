import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { Pagination } from "../ui/components";

vi.mock("../../lib/helpers", () => ({
	itemsPerPage: 25,
}));
Object.defineProperty(window, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

HTMLCanvasElement.prototype.getContext = vi.fn();

describe("Pagination Component", () => {
	it("renders correct number of page buttons based on totalResults", () => {
		const totalResults = 35;
		const page = 1;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const pageButtons = screen.getAllByTestId("pagination-btn");
		expect(pageButtons).toHaveLength(2);
	});

	it("disables the 'Prev' button on the first page", () => {
		const totalResults = 35;
		const page = 1;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const prevButton = screen.getByText("Prev");
		expect(prevButton).toBeDisabled();
	});

	it("disables the 'Next' button on the last page", () => {
		const totalResults = 35;
		const page = 2;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const nextButton = screen.getByText("Next");
		expect(nextButton).toBeDisabled();
	});

	it("calls setPage with the correct page number when page button is clicked", () => {
		const totalResults = 35;
		const page = 1;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const pageButton = screen.getByText("2");
		fireEvent.click(pageButton);

		expect(setPage).toHaveBeenCalledWith(2);
	});

	it("navigates to the next page when the 'Next' button is clicked", () => {
		const totalResults = 35;
		const page = 1;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);

		expect(setPage).toHaveBeenCalledWith(2);
	});

	it("navigates to the previous page when the 'Prev' button is clicked", () => {
		const totalResults = 35;
		const page = 2;
		const setPage = vi.fn();

		render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const prevButton = screen.getByText("Prev");
		fireEvent.click(prevButton);

		expect(setPage).toHaveBeenCalledWith(1);
	});
	it("is accessible", async () => {
		const totalResults = 35;
		const page = 2;
		const setPage = vi.fn();
		const { container } = render(
			<Pagination totalResults={totalResults} page={page} setPage={setPage} />
		);

		const results = await axe(container);
		expect(results.violations.length).toBe(0);
	});
});
