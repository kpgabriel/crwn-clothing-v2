import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	sagaMiddleware,
].filter(Boolean);
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
