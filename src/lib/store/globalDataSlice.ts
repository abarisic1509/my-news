import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleObj } from "../types";

//helper functions for handling local storage
const loadFavoritesFromLocalStorage = (): ArticleObj[] => {
	const serializedFavorites = localStorage.getItem("favorites");
	if (!serializedFavorites) return [];
	return JSON.parse(serializedFavorites);
};
const saveFavoritesToLocalStorage = (favorites: ArticleObj[]) => {
	const serializedFavorites = JSON.stringify(favorites);
	localStorage.setItem("favorites", serializedFavorites);
};

interface GlobalDataState {
	searchTerm: string;
	favorites: ArticleObj[];
}

const initialState: GlobalDataState = {
	searchTerm: "",
	favorites: loadFavoritesFromLocalStorage(),
};

export const globalDataSlice = createSlice({
	name: "globalData",
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
		addFavorite: (state, action: PayloadAction<ArticleObj>) => {
			const newFavorite = action.payload;
			state.favorites.push(newFavorite);
			saveFavoritesToLocalStorage(state.favorites);
		},
		removeFavorite: (state, action: PayloadAction<ArticleObj>) => {
			const selectedArticle = action.payload;
			state.favorites = state.favorites.filter(
				(article) =>
					article.publishedAt !== selectedArticle.publishedAt &&
					article.url !== selectedArticle.url
			);
			saveFavoritesToLocalStorage(state.favorites); // Persist to localStorage
		},
	},
});

export const isFavorite = (
	state: GlobalDataState,
	data: ArticleObj
): boolean => {
	return state.favorites?.some(
		(article) =>
			article.publishedAt === data.publishedAt && article.url === data.url
	);
};

export const { setSearchTerm, addFavorite, removeFavorite } =
	globalDataSlice.actions;

export default globalDataSlice.reducer;
