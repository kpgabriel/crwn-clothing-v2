import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "@redux-saga/core";


const persistConfig = {
  key: 'root',
  storage, 
  blacklist: ['user']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, 
sagaMiddleware
].filter(Boolean);

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
