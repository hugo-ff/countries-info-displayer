import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './combiner';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
