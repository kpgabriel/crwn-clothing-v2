import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_VALUES } from "./category.types";

export const setCategories = (categories) =>
	createAction(CATEGORY_ACTION_VALUES.SET_CATEGORIES, categories);
