import { reducer } from './reducer'

const createStore = (reducer, initialState) => {
	let state = initialState;
	const listeners = [];

	return {
		dispatch: (action) => {
			state = reducer(state, action);
		},
		getState: () => state,
		initializeState: (newState) => {
			store.dispatch({ type: 'INITIALIZE_STATE', payload: newState });
		},
		subscribe: (listener) => {
			listeners.push(listener);
			return () => {
				const index = listeners.indexOf(listener);
				if (index !== -1) listeners.splice(index, 1);
			};
		},
	}
};

export const store = createStore(reducer, {});

