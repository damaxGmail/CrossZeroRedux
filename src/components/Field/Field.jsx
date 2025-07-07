import styles from './Field.module.css'

import { useSelector, useDispatch } from 'react-redux';
import { selectField, selectEffects, selectCurrentState } from '../../selectors'

import { handleCellClick as handleCellClickLogic } from '../../ServiceFunction/General';

const FieldLayout = () => {
	const dispatch = useDispatch();

	const field = useSelector(selectField);
	const { knightEffectActive, dragonEffectActive } = useSelector(selectEffects);

	const currentState = useSelector(selectCurrentState);

	const handleCellClick = (index) => {
		handleCellClickLogic(dispatch, currentState, index);
	};


	return (
		<>
			<div className={styles.field}>

				{
					field.map((cell, index) => {
						const cellClass =
							cell === 'X'
								? styles.cell_Cross
								: cell === '0'
									? styles.cell_Zero
									: styles.cell;

						return (
							<button
								key={index}
								className={cellClass}
								onClick={() => handleCellClick(index)}
							>
							</button>
						);
					})}

			</div>
			<img
				src={knightEffectActive ? '/sprites/Knight3.png' : '/sprites/Knight1.png'}
				alt="Рыцарь"
				className={styles.knight}
			/>
			<img
				src={dragonEffectActive ? '/sprites/dragon-Fire.png' : '/sprites/dragon.png'}
				alt="Дракон"
				className={styles.dragon}
			/>
		</>
	);
}

export const Field = () => {

	return <FieldLayout

	/>
}
