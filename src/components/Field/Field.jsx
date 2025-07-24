import styles from './Field.module.css'

import { connect } from 'react-redux';

import { handleCellClick as handleCellClickLogic } from '../../ServiceFunction/General';

const FieldLayout = (
	{ field, knightEffectActive, dragonEffectActive, currentState, dispatch }
) => {

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

	return <FieldLayoutConnect

	/>
}

const mapStateToProps = (state) => {
	return (
		{
			field: state.field,
			knightEffectActive: state.knightEffectActive,
			dragonEffectActive: state.dragonEffectActive,
			currentState: state
		}
	)
};

const mapDispatchToProps = (dispatch) => ({
	dispatch,
});

export const FieldLayoutConnect = connect(mapStateToProps, mapDispatchToProps)(FieldLayout);
