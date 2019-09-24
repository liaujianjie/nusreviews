import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";

import * as auth from "./auth";

export type StoreState = {
  auth: auth.AuthState;
};

const rootReducer = combineReducers<StoreState>({
  auth: auth.reducer
});
const rootInitialState: StoreState = {
  auth: auth.INITIAL_STATE
};

const composedEnhanders = compose(
  applyMiddleware(thunkMiddleware),
  devToolsEnhancer({})
);

export const store = createStore(
  rootReducer,
  rootInitialState,
  composedEnhanders
);
