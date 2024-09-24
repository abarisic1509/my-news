import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../lib/store/store";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { LoadMore } from "../ui/containers";

interface MockIntersectionObserverEntry extends IntersectionObserverEntry {
	isIntersecting: boolean;
}

// Mock IntersectionObserver
class MockIntersectionObserver {
	callbacks: ((entries: MockIntersectionObserverEntry[]) => void)[] = [];

	constructor(callback: (entries: MockIntersectionObserverEntry[]) => void) {
		this.callbacks.push(callback);
	}

	observe() {
		// Mock implementation
	}

	unobserve() {
		// Mock implementation
	}

	disconnect() {
		// Mock implementation
	}

	// Trigger the callbacks manually for testing
	trigger(entries: MockIntersectionObserverEntry[]) {
		this.callbacks.forEach((callback) => callback(entries));
	}
}

// Mock IntersectionObserver globally in the test
global.IntersectionObserver =
	MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("LoadMore", () => {
	it("shows a loader when hasMore is true", () => {
		render(
			<Provider store={store}>
				<LoadMore />
			</Provider>
		);

		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("is accessible", async () => {
		const { container } = render(
			<Provider store={store}>
				<LoadMore />
			</Provider>
		);

		const results = await axe(container);
		expect(results.violations.length).toBe(0);
	});
});
