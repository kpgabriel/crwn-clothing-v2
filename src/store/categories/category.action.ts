import {
	createAction,
	Action,
	ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

import { CATEGORY_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoryStart =
	Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export type CategoryAction =
	| FetchCategoryStart
	| FetchCategoriesSuccess
	| FetchCategoriesFailed;

export type FetchCategoriesFailed = ActionWithPayload<
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

export const fetchCategoriesStart = (): FetchCategoryStart =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
	categoriesArray: Category[]
): FetchCategoriesSuccess =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
