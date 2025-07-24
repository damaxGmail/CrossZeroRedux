import { ScreenSaver } from '../components/ScreenSaver/ScreenSaver';
import { Game } from '../components/Game/Game';

export const AppLayout = (
	{ page,
		goToGame
	}
) => {

	return (
		<>
			<div className="max-w-[1280px] mx-auto p-8 text-center font-sans text-white bg-[#242424] min-h-screen">
				{page === 'screensaver' && <ScreenSaver onStart={goToGame} />}
				{page === 'game' && <Game />}
			</div>
		</>
	);
};

export default AppLayout;
