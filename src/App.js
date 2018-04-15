import React from 'react';
import ReactDOM from 'react-dom';
import Register from './page/Register';
import Home from './page/Home';
import AddSubject from './page/AddSubject';
import RegistConfirm from './page/RegistConfirm'

// function goHome() {
// 	this.setState({
// 			window: <Home />,
// 			prev_window: <Home />
// 		});
// }

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			window: <Home />,
			prev_window:  <Home />
		};

	}

	changeWindow = (wind) => {
		this.setState({
			prev_window: this.state.window,
		});
		this.setState ({
			window: wind,
		});
	};

	backWindow = () => {
		this.setState({
			window: this.state.prev_window,
		});
	};

	goHome = () => {
		alert('ทำรายการเรียบร้อย');
		this.setState({
			window: <Home />,
			prev_window: <Home />
		});
	};


	render() {
		return (
			<div className = 'regAll'>
				<div className = 'menuBar'>
					<h1>BooBooDB</h1>
					<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
					<div className = 'menuChoice'>
						<button onClick={() => this.changeWindow(<Register changeWindow={this.changeWindow} backWindow={this.backWindow} goHome={this.goHome}/>)}>ลงทะเบียนเรียน</button>
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