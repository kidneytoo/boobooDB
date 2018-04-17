import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory"
import App from './App'
import $ from 'jquery'

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
		alert('http://localhost:8888/checkAuthentificate/' + this.state.person);
		$.post('http://localhost:8888/checkAuthentificate/' + this.state.person, this.state , function(data , status){
			console.log('checkAunthentification data: ' + data + ', status: ' + status);
			if(data == "Login successful"){
				alert("Login successful");
			}
			else{
				alert("Incorrect username or password")
				// relogin not change page***
			}
		});

		// jQuery.ajax({
    //     type: "POST",
    //     async: true,
    //     url: 'http://localhost:8888/checkAuthentificate/' + this.state.person,
    //     data:  this.state,
    //     dataType: "json",
    //     contentType: "application/json; charset=utf-8",
    //     success: function(data , status) {
		// 			alert('From server => data: ' + data + ', status: ' + status);
		// 			console.log('checkAunthentification data: ' + data + ', status: ' + status);
		// 		},
    //     error: function (err)
    //     { alert(err.responseText)}
    // });

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
					<div><button type="submit" className="small" onclick={this.checkAuthentificate}>เข้าสู่ระบบ</button></div>
				</form>
			</div>
		);
	}
}
