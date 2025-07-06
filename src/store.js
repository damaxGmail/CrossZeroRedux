
import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(reducer);

// const createStore = (reducer, initialState) => {
// 	let state = initialState;
// 	const listeners = [];

// 	return {
// 		dispatch: (action) => {
// 			state = reducer(state, action);
//listeners.forEach((listener) => listener());
// 		},
// 		getState: () => state,
// 		initializeState: (newState) => {
// 			store.dispatch({ type: 'INITIALIZE_STATE', payload: newState });
// 		},
// 		subscribe: (listener) => {
// 			listeners.push(listener);
// 			return () => {
// 				const index = listeners.indexOf(listener);
// 				if (index !== -1) listeners.splice(index, 1);
// 			};
// 		},
// 	}
// };



