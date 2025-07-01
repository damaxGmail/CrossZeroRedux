
import { store } from '../store';

import { Reset } from '../Reset/Reset'
import { Field } from '../Field/Field'
import { Information } from '../Information/Information'

import styles from '../Game/Game.module.css';
import { useState, useEffect } from 'react';
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

				<Information isDraw={isDraw}
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


	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);//ничья

	const [field, setField] = useState(store.getState().field);
	const [knightEffectActive, setKnightEffectActive] = useState(false);
	const [dragonEffectActive, setDragonEffectActive] = useState(false);

	//*****
	store.dispatch({
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


	//******


	useEffect(() => {
		// Подписываемся на изменения состояния в хранилище
		const unsubscribe = store.subscribe(() => {
			const currentState = store.getState();

			setField(currentState.field);
			setKnightEffectActive(currentState.knightEffectActive);
			setDragonEffectActive(currentState.dragonEffectActive);

			setIsGameEnded(currentState.isGameEnded);
			setIsDraw(currentState.isDraw);
			setCurrentPlayer(currentState.currentPlayer);

		});
		document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto";

		// Отписываемся при размонтировании компонента
		return () => unsubscribe();
	}, []);

	// Обработчик кнопки "Начать заново"
	const handleReset = () => {
		// setCurrentPlayer('X');
		// setIsGameEnded(false);
		// setIsDraw(false);
		// setField(Array(9).fill(''));
		// playSound(currentPlayer, 'click');
		store.dispatch({
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


