
import { useDispatch } from 'react-redux';
import {
	SET_FIELD,
	SET_CURRENT_PLAYER,
	SET_KNIGHT_EFFECT_ACTIVE,
	SET_DRAGON_EFFECT_ACTIVE,
	SET_GAME_ENDED,
	SET_DRAW
} from '../action'

import { playSound } from '../Effect/Effect';

// Обработчик клика по клетке
export const handleCellClick = (currentState1, index) => {
	const dispatch = useDispatch();

	const currentState = store.getState();
	const { field, currentPlayer, isGameEnded } = currentState;


	// const { field } = currentState;

	if (field[index] || isGameEnded) return;

	dispatch(SET_CURRENT_PLAYER(currentPlayer));
	playSound(currentPlayer, 'move');

	const newField = [...field];
	newField[index] = currentPlayer;

	//setField(newField);
	dispatch(SET_FIELD(newField));

	if (currentPlayer === 'X') {
		//setKnightEffectActive(true); // Включаем эффект для рыцаря
		//dispatch({ type: 'SET_KNIGHT_EFFECT_ACTIVE', payload: true });
		dispatch(SET_KNIGHT_EFFECT_ACTIVE(true));
	} else {
		//setDragonEffectActive(true); // Включаем эффект для дракона
		//dispatch({ type: 'SET_DRAGON_EFFECT_ACTIVE', payload: true });
		dispatch(SET_DRAGON_EFFECT_ACTIVE(true));
	}

	// Изменение курсора
	if (currentPlayer === 'X') {
		document.body.style.cursor = "url('/kursors/Arm_Dracon_64.ico'), auto"; // Курсор для дракона
	} else {

		document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto"; // Курсор для рыцаря
	}

	if (!checkWin(newField, currentState)) {

		//setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
		//dispatch({ type: 'SET_CURRENT_PLAYER', payload: currentPlayer === 'X' ? '0' : 'X' });
		dispatch(SET_CURRENT_PLAYER(currentPlayer === 'X' ? '0' : 'X'));
	}

	//  эффект длиться только пол секунды
	setTimeout(() => {

		// setKnightEffectActive(false);
		// setDragonEffectActive(false);

		//dispatch({ type: 'SET_KNIGHT_EFFECT_ACTIVE', payload: false });
		//dispatch({ type: 'SET_DRAGON_EFFECT_ACTIVE', payload: false });

		dispatch(SET_KNIGHT_EFFECT_ACTIVE(false));
		dispatch(SET_DRAGON_EFFECT_ACTIVE(false));

	}, 500);

};


//проверка результата игры
export const checkWin = (newField, currentState) => {
	const dispatch = useDispatch();

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
			//setIsGameEnded(true);
			//dispatch({ type: 'SET_GAME_ENDED', payload: true });
			dispatch(SET_GAME_ENDED(true));

			playSound(currentPlayer, 'win');
			return true;
		}

		//проверка на ничью , если не нашли победу
		if (!newField.includes('')) {

			//setIsGameEnded(true);
			//setIsDraw(true);
			//dispatch({ type: 'SET_GAME_ENDED', payload: true });
			//dispatch({ type: 'SET_DRAW', payload: true });
			dispatch(SET_GAME_ENDED(true));
			dispatch(SET_DRAW(true));

			playSound(currentPlayer, 'draw');
			return false;
		}

	}

	return false;
};
