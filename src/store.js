import { reducer } from './reducer'

const createStore = (reducer, initialState) => {
	let state = initialState;

	return {
		dispatch: (action) => {
			state = reducer(state, action);
		},
		getState: () => state,
		initializeState: (newState) => {
			store.dispatch({ type: 'INITIALIZE_STATE', payload: newState });
		},
	};
};

export const store = createStore(reducer, {});

