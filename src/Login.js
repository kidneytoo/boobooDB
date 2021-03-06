import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory"
import App from './App'
import $ from 'jquery'
import dog from'./image/dog.svg'

var studentLogin = null;
function goToStudent(e) {
	ReactDOM.render(
  			<App studentID={studentLogin}/>,
  			document.getElementById('root')
		);
}

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: '',
			password: '',
			person: 'student',
		};
	}

	handleStudentIDchange = (evt) => {
		this.setState({ studentID: evt.target.value });
	}

	handlePasswordchange = (evt) => {
		this.setState({ password: evt.target.value });
	}

	handlePersonchange = (evt) => {
		this.setState({ person: evt.target.value });
	}


	// goToStudent = (e) => {
	// 	ReactDOM.render(
 //  			<App studentID={this.state.studentID}/>,
 //  			document.getElementById('root')
	// 	);
	// }

	goToStaff = () => {

	}

	checkAuthentificate = () => {

		//ดึง database มา check password
		studentLogin = this.state.studentID;
		// alert('http://localhost:8888/checkAuthentificate/' + this.state.person);
		$.post('http://localhost:8888/checkAuthentificate/' + this.state.person, this.state , function(data , status){
			console.log('checkAunthentification data: ' + data + ', status: ' + status);
			alert(data);
			if(data == "Login successful"){
				goToStudent();
			}
			else if(data == "Incorrect username or password"){
				// do nothing - just alert
			}
		});
	}



	render() {
		return(
			<div className='loginContainer'>
				<img src={dog} className='dogLogin'/>
				<h1>BoobooDB</h1>
				<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
				<form>
					<div className='loginLabel'>
						<label for="sid">รหัสประจำตัว</label>
						<input value={this.state.studentID} onChange={this.handleStudentIDchange} className="sid" type="text" placeholder="10 หลัก" required></input>
					</div>
					<div className='loginLabel'>
						<label for="pass">รหัสผ่าน</label>
						<input value={this.state.password} onChange={this.handlePasswordchange} className="pass" type="password" required></input>
					</div>
					<div>
						<select name="person" id='person' value={this.state.person} onChange={this.handlePersonchange}>
							<option value="student">นิสิต</option>
							<option value="staff">เจ้าหน้าที่</option>
							</select>
					</div>
					<div><button type="button" className="small" onClick={this.checkAuthentificate}>เข้าสู่ระบบ</button></div>
				</form>
			</div>
		);
	}
}
