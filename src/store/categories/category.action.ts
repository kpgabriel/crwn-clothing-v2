import {
	createAction,
	Action,
	ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

import { CATEGORY_ACTION_TYPES, Category } from "./category.types";

import { withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoryStart =
	Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

export const fetchCategoriesStart = withMatcher(
	(): FetchCategoryStart =>
		createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategoriesSuccess =>
		createAction(
			CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
			categoriesArray
		)
);

export const fetchCategoriesFailed = withMatcher(
	(error: Error): FetchCategoriesFailed =>
		createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
