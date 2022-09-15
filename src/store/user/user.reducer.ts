import { AnyAction } from 'redux';
import {
	signOutSuccess,
	signInFailed,
	signOutFailed,
	signUpFailed,
	signInSuccess,
} from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: Boolean;
	readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = USER_INITIAL_STATE,
	action: AnyAction
): UserState => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signInFailed.match(action) ||
		signOutFailed.match(action) ||
		signUpFailed.match(action)
	) {
		return { ...state, error: action.payload };
	}

	return state;
};
