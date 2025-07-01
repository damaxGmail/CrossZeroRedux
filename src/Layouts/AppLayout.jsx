import { ScreenSaver } from '../ScreenSaver/ScreenSaver';
import { Game } from '../Game/Game';

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
