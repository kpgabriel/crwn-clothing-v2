import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import {
	createUserDocumentFromAuth,
	getCurrentuser,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		console.log('test');
		const userAuth = yield call(getCurrentuser);
		if (!userAuth) return;
		const user = yield call(getSnapshotFromUserAuth, userAuth);
		put(signInSuccess(user));
	} catch (error) {
		put(signInFailed(error));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
	yield all([call(onCheckUserSession)]);
}
