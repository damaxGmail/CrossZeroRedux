import React, { useState, useEffect } from 'react';

import { store } from './store'

import { ScreenSaver } from './ScreenSaver/ScreenSaver';
import { Game } from './Game/Game';

import './App.css'

const AppLayout = (
	{ page,
		goToGame
	}
) => {


	return (
		<>
			<div>
				{page === 'screensaver' && <ScreenSaver onStart={goToGame} />}
				{page === 'game' && <Game />}
			</div>
		</>
	);
}
export const App = () => {
	const [page, setPage] = useState('screensaver');

	useEffect(() => {
		// Начальная инициализация store
		const initialData = {
			currentPlayer: 'X',
			field: Array(9).fill(''),
			isGameEnded: false,
			isDraw: false,
		};

		store.initializeState(initialData);
	}, []);


	const goToGame = () => {
		setPage('game'); // Переход на страницу игры
	};

	return <AppLayout
		page={page}
		goToGame={goToGame}
	/>;

};

export default App;
