import { USER_INITIAL_STATE, USER_ACTION_TYPES } from "./user.types";

export const userReducer = (state = USER_INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			return state;
	}
};
