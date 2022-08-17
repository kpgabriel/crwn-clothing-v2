import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
// import { createStore } from "redux";
// import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleWare = (store) => (next) => (action) => {
	if (!action.type) {
		next(action);
	}

	console.log("Action type:", action.type);
	console.log("Action payload:", action.payload);
	console.log("Current State:", store.getState());

	next(action);

	console.log("next State:", store.getState());
};

const middleWares = [loggerMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const config = {
	reducer: rootReducer,
	enhancers: composedEnhancers,
	preloadedState: undefined,
};
// root-reducer
export const store = configureStore(config);
