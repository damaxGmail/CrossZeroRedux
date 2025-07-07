
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentState } from '../../selectors'

import { Reset } from '../Reset/Reset'
import { Field } from '../Field/Field'
import { Information } from '../Information/Information'

import styles from './Game.module.css';
import { useEffect } from 'react';
import { playSound } from '../Effect/Effect';

const GameLayout = ({
	isDraw,
	isGameEnded,
	currentPlayer,
	onReset,
	ExitGame
}) => {

	return (
		<>
			<div className={styles.gameZona}>

				<Field
				/>
				<Information
					isDraw={isDraw}
					isGameEnded={isGameEnded}
					currentPlayer={currentPlayer}
				/>
				<Reset
					onReset={onReset}
					ExitGame={ExitGame}
				/>
			</div >
		</>

	);
}

export const Game = () => {
	const dispatch = useDispatch();

	const { currentPlayer, isGameEnded, isDraw } = useSelector(selectCurrentState);

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

	// Обработчик кнопки "Начать заново"
	const handleReset = () => {

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
		playSound(currentPlayer, 'click');
	};

	// Обработчик кнопки "Выход"
	const handleExitGame = () => {
		playSound(currentPlayer, 'click');
		window.close();
	}

	return <GameLayout
		isDraw={isDraw}
		isGameEnded={isGameEnded}
		currentPlayer={currentPlayer}
		onReset={handleReset}
		ExitGame={handleExitGame}
	/>;
};


