import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppLayout } from './Layouts/AppLayout';

export const App = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState('screensaver');

	useEffect(() => {
		dispatch({
			type: 'INITIALIZE_STATE',
			payload: {
				field: Array(9).fill(''),
				currentPlayer: 'X',
				isGameEnded: false,
				isDraw: false,
				knightEffectActive: false,
				dragonEffectActive: false,
			}
		});
		document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto";
	}, [dispatch]);


	const goToGame = () => {
		setPage('game'); // Переход на страницу игры
	};

	return <AppLayout
		page={page}
		goToGame={goToGame}
	/>;

};

export default App;
