import { createSelector } from "reselect";
import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;


// memoized selector only reruns when categorySlice is different.
export const slectCategories = createSelector(
	[selectCategoryReducer],
	(categorySlice) => categorySlice.categories
);

// memoized again. For the mapping
// As long as categories array has not changed do not bother re-reunning
// Runs at least once.
export const selectCategoryMap = createSelector(
	[slectCategories],
	(categories): CategoryMap =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categorySlice) => categorySlice.isLoading
);
