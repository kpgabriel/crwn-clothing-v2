import { configureStore, compose, applyMiddleware, Middleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

declare global {
	interface Window{
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
	}
}

export type RootState = ReturnType<typeof rootReducer>


type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[]
}
const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	sagaMiddleware,
].filter((middleware): middleware is Middleware  => Boolean(middleware));

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
