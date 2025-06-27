import { useState } from 'react';
import styles from './ScreenSaver.module.css';

const ScreenSaverLayout = ({ isPressed, showText, handleScreenClick }) => {
	return (
		<div className={styles.screensaver} onClick={handleScreenClick}>
			{/* Картинка заставки */}
			<img
				src="/public/GameStart_4.png"
				alt="Game Start"
				className={`${styles.image} ${isPressed ? styles.pressed : ''}`}
			/>

			{/* Контейнер для текста внутри заставки */}
			{showText && (
				<div className={styles.textContainer}>
					<h1 className={styles.TextGame}>ice vs flame</h1>
				</div>
			)}

		</div>
	);
}

export const ScreenSaver = ({ onStart }) => {

	const [isPressed, setIsPressed] = useState(false); // Состояние "нажатия"
	const [showText, setShowText] = useState(true); // Показывать текст или нет

	//setShowText();//

	// Обработчик клика по заставке
	const handleScreenClick = () => {
		// Изменяем состояние на "нажатие" (для эффектов в css)
		setIsPressed(true);
		onStart();
	};

	return (
		<ScreenSaverLayout
			isPressed={isPressed}
			showText={showText}
			handleScreenClick={handleScreenClick}

		/>
	)
};
