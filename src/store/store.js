import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
	Boolean
);
const composedEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

const config = {
	reducer: persistedReducer,
	middleware: middleWares,
	devTools: process.env.NODE_ENV !== "production",
	preloadedState: undefined,
};
// root-reducer
export const store = configureStore(config);
export const persistor = persistStore(store);
