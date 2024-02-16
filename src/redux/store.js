import {legacy_createStore as createStore} from 'redux';
import { applyMiddleware } from 'redux'; 
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/allSagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//     middlewares.push(logger);
// }
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
    );
 sagaMiddleware.run(rootSaga);
export default store;