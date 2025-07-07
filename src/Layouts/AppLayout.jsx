import { ScreenSaver } from '../components/ScreenSaver/ScreenSaver';
import { Game } from '../components/Game/Game';

import '../App.css';

export const AppLayout = (
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
};

export default AppLayout;
