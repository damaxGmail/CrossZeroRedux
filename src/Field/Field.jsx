import styles from './Field.module.css'
import { store } from '../store';

import { useEffect, useState } from 'react';

import { handleCellClick } from '../ServiceFunction/General';

const FieldLayout = () => {

	const currentState = store.getState();
	const { knightEffectActive, dragonEffectActive } = currentState;

	const [field, setField] = useState(store.getState().field);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setField(store.getState().field);
		});

		return () => unsubscribe();
	}, []);


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
								onClick={() => handleCellClick(store.getState(), index, store.dispatch)}
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
