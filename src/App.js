import React from 'react';
import ReactDOM from 'react-dom';
import Register from './page/Register';
import Home from './page/Home';
import AddSubject from './page/AddSubject';
import RegistConfirm from './page/RegistConfirm'
import RegistWait from './page/RegistWait'
<<<<<<< HEAD
=======
import dog from'./image/dog.svg'
>>>>>>> 42d6cb58b666b2bcc2faeb71b0ddfa0c8ab4fc3f

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			window: <Home studentID={this.props.studentID}/>,
			prev_window:  <Home studentID={this.props.studentID}/>
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
			window: <Home studentID={this.props.studentID}/>,
			prev_window: <Home studentID={this.props.studentID}/>
		});
	};


	render() {
		return (
			<div className = 'regAll'>
				<div className = 'menuBar'>
					<img src={dog} className='dogApp' />
					<h1>BooBooDB</h1>
					<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
					<div className = 'menuChoice'>
						<button onClick={() => this.changeWindow(<Register changeWindow={this.changeWindow} studentID={this.state.studentID} backWindow={this.backWindow} goHome={this.goHome}/>)}>ลงทะเบียนเรียน</button>
						<button onClick={() => this.changeWindow(<AddSubject />)}>เพิ่มรายวิชา/เปลี่ยนตอนเรียน</button>
						<button onClick={() => this.changeWindow(<RegistWait studentID={this.state.studentID} />)}>ผลการแสดงความจำนงการลงทะเบียนเรียน</button>
					</div>
				</div>
				<div className = 'displayScreen'>
					<div>{this.state.window}</div>
				</div>



			</div>




		);
	}
}