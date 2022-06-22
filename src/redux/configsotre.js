import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./moduels/user";
import socialing from './moduels/socialing';

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ user, socialing });

const store = createStore(rootReducer, enhancer);

export default store;
