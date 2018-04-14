import React from 'react';
import ReactDOM from 'react-dom';
import Register from './page/Register';
import Home from './page/Home';
import AddSubject from './page/AddSubject';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			window: <Home />
		};
	}

	changeWindow(wind) {
		this.setState ({
			window: wind,
		});
	};


	render() {
		return (
			<div className = 'regAll'>
				<div className = 'menuBar'>
					<h1>BooBooDB</h1>
					<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
					<div className = 'menuChoice'>
						<button onClick={() => this.changeWindow(<Register />)}>ลงทะเบียนเรียน</button>
						<button onClick={() => this.changeWindow(<AddSubject />)}>เพิ่มรายวิชา/เปลี่ยนตอนเรียน</button>
					</div>
				</div>
				<div className = 'displayScreen'>
					<div>{this.state.window}</div>
				</div>



			</div>




		);
	}
}