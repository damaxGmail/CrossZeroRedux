import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppLayout } from './Layouts/AppLayout';

class AppConnect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'screensaver',
		};
		this.goToGame = this.goToGame.bind(this);
	}

	componentDidMount() {
		// Инициализация
		this.props.dispatch({
			type: 'INITIALIZE_STATE',
			payload: {
				field: Array(9).fill(''),
				currentPlayer: 'X',
				isGameEnded: false,
				isDraw: false,
				knightEffectActive: false,
				dragonEffectActive: false,
			},
		});
		document.body.style.cursor = "url('/kursors/Arm_knight_64.ico'), auto";
	}

	goToGame() {
		this.setState({ page: 'game' });
	}

	render() {
		const { page } = this.state;

		return (
			<div className="max-w-[1280px] mx-auto p-8 text-center font-sans text-white bg-[#242424] min-h-screen">
				<AppLayout
					page={page}
					goToGame={this.goToGame}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
});

const App = connect(null, mapDispatchToProps)(AppConnect);

export default App;
