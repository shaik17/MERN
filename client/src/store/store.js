import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialstate = {};
const middleware = [thunk];
const applied = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialstate, applied);
export default store;
