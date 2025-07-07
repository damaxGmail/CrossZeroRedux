
export const playSound = (player, event) => {
	let soundFile;

	// Определяем путь к звуковому файлу в зависимости от игрока и события
	switch (event) {
		case 'click':
			soundFile = '/sounds/button_press_enter.mp3'; // Простой щелчок по кнопке
			break;
		case 'move':
			soundFile = player === 'X' ? '/sounds/mech-klinok.mp3' : '/sounds/FireDrakon.mp3';
			break;
		case 'win':
			soundFile = player === 'X' ? '/sounds/WinKnight.mp3' : '/sounds/WinnerDrak.mp3';
			break;
		case 'draw':
			soundFile = '/sounds/WinDraw.mp3';
			break;
		case 'Registration':
			soundFile = '/sounds/screensaver.mp3';
			break;
		default:
			console.warn('Неизвестное событие:', event);
			return;
	}

	// Воспроизводим звук
	const audio = new Audio(soundFile);
	audio.play().catch((e) => console.error("Не удалось проиграть звук:", e));
	return audio;
};
