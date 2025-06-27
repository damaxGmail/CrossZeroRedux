const reducer = (state, action) => {
	const { type, payload } = action;


	switch (type) {
		case 'uslovie1': {
			return payload;
		}
		case 'uslovie2': {
			return payload;
		}
		default:
			return state
	}
}
