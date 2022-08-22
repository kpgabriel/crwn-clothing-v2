import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// memoized selector only reruns when categorySlice is different.
export const slectCategories = createSelector(
	[selectCategoryReducer],
	(categorySlice) => categorySlice.categories
);

// memoized again. For the mapping
// As long as categories array has not cahnged do not bother re-reunning
// Runs at least once.
export const selectCategoryMap = createSelector(
	[slectCategories],
	(categories) =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categorySlice) => categorySlice.isLoading
);
