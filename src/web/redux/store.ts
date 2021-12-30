import reducer from "@web/redux/reducers/initialize"
import { createStore, combineReducers } from 'redux';
const rootReducer = combineReducers({
	initialize: reducer
});
export const store = createStore(
	rootReducer,
	typeof window !== "undefined" &&
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__()
);