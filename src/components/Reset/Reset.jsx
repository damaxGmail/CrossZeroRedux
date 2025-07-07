import styles from './Reset.module.css';
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</link>

const ResetLayout = ({ onReset, ExitGame }) => {
	return (
		<div className={styles['button-container']}>
			<button className={styles.button} onClick={onReset}> Начать заново </button>
			<button className={styles.button} onClick={ExitGame}> Завершить </button>
		</div>
	);
}

export const Reset = ({ onReset, ExitGame }) => {

	return <ResetLayout onReset={onReset} ExitGame={ExitGame} />
}
