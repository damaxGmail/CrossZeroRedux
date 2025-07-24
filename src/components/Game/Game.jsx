import { connect } from 'react-redux';


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

const Game_Connect = ({ currentPlayer, isGameEnded, isDraw, dispatch }) => {


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


const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw
});

const mapDispatchToProps = (dispatch) => ({
	dispatch,
});

export const Game = connect(mapStateToProps, mapDispatchToProps)(Game_Connect);

