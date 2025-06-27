
import { store } from '../store';

import { Reset } from '../Reset/Reset'
import { Field } from '../Field/Field'
import { Information } from '../Information/Information'

import styles from './Game.module.css';
import { useState, useEffect } from 'react';
import { playSound } from '../Effect/Effect';

const GameLayout = ({
	//field,
	isDraw,
	isGameEnded,
	currentPlayer,
	handleCellClick,
	onReset,
	ExitGame,
	knightEffectActive,
	dragonEffectActive
}) => {

	return (
		<>
			<div className={styles.gameZona}>

				<Field
					// field={field}
					onCellClick={handleCellClick}
					knightEffectActive={knightEffectActive}
					dragonEffectActive={dragonEffectActive}
				/>

				<Information isDraw={isDraw}
					isGameEnded={isGameEnded}
					currentPlayer={currentPlayer}
				/>
				<Reset onReset={onReset} ExitGame={ExitGame} />

			</div >
		</>

	);
}

export const Game = () => {

	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);//ничья

	const [field, setField] = useState(store.getState().field);
	const [knightEffectActive, setKnightEffectActive] = useState(false);
	const [dragonEffectActive, setDragonEffectActive] = useState(false);


	// useEffect(() => {
	//         // Подписываемся на изменения состояния в хранилище
	//         const unsubscribe = store.subscribe(() => {
	//             setField(store.getState().field); // Обновляем поле из хранилища
	//         });

	//         // Отписываемся при размонтировании компонента
	//         return () => unsubscribe();
	//     }, []);

	//Изменение курсора
	useEffect(() => {
		if (currentPlayer === 'X') {
			document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto"; // Курсор для рыцаря (крестик)
		} else {
			document.body.style.cursor = "url('/kursors/Arm_Dracon_64.ico'), auto"; // Курсор для дракона (нолик)
		}
	}, [currentPlayer]);


	// Обработчик клика по клетке
	const handleCellClick = (index) => {
		playSound(currentPlayer, 'move');

		const currentState = store.getState();
		const { field } = currentState;

		if (field[index] || currentState.isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;

		//setField(newField);
		store.dispatch({ type: 'SET_FIELD', payload: newField });

		if (currentPlayer === 'X') {
			setKnightEffectActive(true); // Включаем эффект для рыцаря
		} else {
			setDragonEffectActive(true); // Включаем эффект для дракона
		}

		if (!checkWin(newField)) {
			setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
		}

		//  эффект длиться только пол секунды
		setTimeout(() => {
			setKnightEffectActive(false);
			setDragonEffectActive(false);
		}, 500);

	};

	//проверка результата игры
	const checkWin = (newField) => {

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
				setIsGameEnded(true);
				playSound(currentPlayer, 'win');
				return true;
			}

			//проверка на ничью , если не нашли победу
			if (!newField.includes('')) {
				setIsGameEnded(true);
				setIsDraw(true);
				playSound(currentPlayer, 'draw');
				return false;
			}

		}

		return false;
	};

	// Обработчик кнопки "Начать заново"
	const handleReset = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(''));
		playSound(currentPlayer, 'click');
	};
	const handleExitGame = () => {
		playSound(currentPlayer, 'click');
		window.close();
	}

	return <GameLayout
		//field={field}
		isDraw={isDraw}
		isGameEnded={isGameEnded}
		currentPlayer={currentPlayer}
		handleCellClick={handleCellClick}
		onReset={handleReset}
		ExitGame={handleExitGame}
		knightEffectActive={knightEffectActive}
		dragonEffectActive={dragonEffectActive}
	/>;
};


