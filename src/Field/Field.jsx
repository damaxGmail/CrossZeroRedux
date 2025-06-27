import styles from './Field.module.css'

const FieldLayout = ({ field, onCellClick, knightEffectActive, dragonEffectActive }) => {

	return (
		<>
			<div className={styles.field}>

				{field.map((cell, index) => {
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
							onClick={() => onCellClick(index)}
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

export const Field = ({ field, onCellClick, knightEffectActive, dragonEffectActive }) => {
	return <FieldLayout
		field={field}
		onCellClick={onCellClick}
		knightEffectActive={knightEffectActive}
		dragonEffectActive={dragonEffectActive} />
}
