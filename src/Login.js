import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory"
import App from './App'

const history = createHistory()

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


	goToStudent = (e) => {
		ReactDOM.render(
  			<App studentID={this.state.studentID}/>,
  			document.getElementById('root')
		);
	}

	goToStaff = () => {

	}

	checkAuthentificate = () => {

		//ดึง database มา check password

		this.goToStudent();
	}



	render() {


		return(
			<div className='loginContainer'>
				<form onSubmit={this.checkAuthentificate}>
					<div>
						<label for="sid">รหัสประจำตัว</label>
						<input value={this.state.studentID} onChange={this.handleStudentIDchange} className="sid" type="text" placeholder="10 หลัก" required></input>
					</div>
					<div>
						<label for="pass">รหัสผ่าน</label>
						<input value={this.state.password} onChange={this.handlePasswordchange} className="pass" type="password" required></input>
					</div>
					<div>
						<select name="person" id='person' value={this.state.person} onChange={this.handlePersonchange}>
							<option value="student">นิสิต</option>
							<option value="staff">เจ้าหน้าที่</option>
							</select>
					</div>
					<div><button type="submit" className="small">เข้าสู่ระบบ</button></div>
				</form>
			</div>
		);
	}
}