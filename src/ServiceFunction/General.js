
import {
	SET_FIELD,
	SET_CURRENT_PLAYER,
	SET_KNIGHT_EFFECT_ACTIVE,
	SET_DRAGON_EFFECT_ACTIVE,
	SET_GAME_ENDED,
	SET_DRAW
} from '../actions'

import { playSound } from '../components/Effect/Effect';

// Обработчик клика по клетке
export const handleCellClick = (dispatch, currentState, index) => {

	const { field, currentPlayer, isGameEnded } = currentState;

	if (field[index] || isGameEnded) return;

	dispatch(SET_CURRENT_PLAYER(currentPlayer));
	playSound(currentPlayer, 'move');

	const newField = [...field];
	newField[index] = currentPlayer;


	dispatch(SET_FIELD(newField));

	if (currentPlayer === 'X') {
		dispatch(SET_KNIGHT_EFFECT_ACTIVE(true));
		document.body.style.cursor = "url('/kursors/Arm_Dracon_64.ico'), auto"; // Курсор для дракона
	} else {
		dispatch(SET_DRAGON_EFFECT_ACTIVE(true));
		document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto"; // Курсор для рыцаря
	}


	if (!checkWin(newField, currentState, dispatch)) {
		dispatch(SET_CURRENT_PLAYER(currentPlayer === 'X' ? '0' : 'X'));
	}

	//  эффект длиться только пол секунды
	setTimeout(() => {
		dispatch(SET_KNIGHT_EFFECT_ACTIVE(false));
		dispatch(SET_DRAGON_EFFECT_ACTIVE(false));
	}, 500);
};


//проверка результата игры
export const checkWin = (newField, currentState, dispatch) => {

	const { currentPlayer } = currentState;

	const WIN_PATTERNS = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
	];

	for (const variantWin of WIN_PATTERNS) {
		const first = variantWin[0];
		const second = variantWin[1];
		const three = variantWin[2];

		if (newField[first] === '' || newField[second] === '' || newField[three] === '') {
			continue;
		}
		else if (newField[first] === newField[second] && newField[first] === newField[three]) {

			dispatch(SET_GAME_ENDED(true));
			playSound(currentPlayer, 'win');
			return true;
		}

		//проверка на ничью , если не нашли победу
		if (!newField.includes('')) {

			dispatch(SET_GAME_ENDED(true));
			dispatch(SET_DRAW(true));

			playSound(currentPlayer, 'draw');
			return false;
		}

	}

	return false;
};
