const initialState = {};

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'INITIALIZE_STATE':
			return { ...state, ...action.payload };
		case 'SET_FIELD':
			return { ...state, field: payload };
		case 'SET_CURRENT_PLAYER':
			return { ...state, currentPlayer: payload };
		case 'SET_GAME_ENDED':
			return { ...state, isGameEnded: payload };
		case 'SET_DRAW':
			return { ...state, isDraw: payload };
		default:
			return state;
	}
}
