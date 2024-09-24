import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../lib/store/store";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { Search } from "../ui/components";

describe("Search", () => {
	it("renders search input without button when withButton is falsy", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByPlaceholderText("Search news")).toBeInTheDocument();
	});

	it("dispatches search term on input change", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Search withButton={true} />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.change(screen.getByPlaceholderText("Search news"), {
			target: { value: "New search" },
		});
		expect(screen.getByDisplayValue("New search")).toBeInTheDocument();
	});

	it("is accessible", async () => {
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Search withButton={true} />
				</MemoryRouter>
			</Provider>
		);

		const results = await axe(container);
		expect(results.violations.length).toBe(0);
	});
});
