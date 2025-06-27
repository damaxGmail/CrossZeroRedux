import React, { useState } from 'react';
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

	const goToGame = () => {
		setPage('game'); // Переход на страницу игры
	};

	return <AppLayout
		page={page}
		goToGame={goToGame}
	/>;

};

export default App;
