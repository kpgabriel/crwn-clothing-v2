import { CATEGORY_ACTION_VALUES } from "./category.types";

export const CATEGOIRES_INITIAL_STATE = {
	categories: [],
};

export const categoriesReducer = (
	state = CATEGOIRES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORY_ACTION_VALUES.SET_CATEGORIES:
			return { ...state, categories: payload };
		default:
			return state;
	}
};
