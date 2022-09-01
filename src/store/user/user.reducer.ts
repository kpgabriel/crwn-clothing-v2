import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
	readonly currentUser: {} | null;
	readonly isLoading: Boolean;
	readonly error: Error | null;
}

export const USER_INITIAL_STATE : UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: payload,
			};
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null };

		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
			return { ...state, error: payload };
		default:
			return state;
	}
};
