import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import _ from 'lodash'

<<<<<<< HEAD
var axios = require('axios')

// ตรงนี้น่าจะเป็น function ดึงข้อมูลนะ ป่ะ
function getRegistData(studentID) {
	var sid = studentID;
	var regData;

	return new Promise( async (resolve, reject) => {
		await(async()=>{
			regData = (await axios.post('http://localhost:8888/student/register/reqRegisteredData',{"sid" : sid})).data.data;
			console.log(regData);
		})();
		resolve("success")
	}).then((successMsg) => {
		console.log(regData);
		return regData;
	})
}

// ไป setState เป็น registSubject ด้วยจะดี
=======

// ตรงนี้น่าจะเป็น function ดึงข้อมูลนะ ป่ะ
function getRegistSubjec() {
	
}

// ไป setState เป็น registSubject ด้วยจะดี 
>>>>>>> 42d6cb58b666b2bcc2faeb71b0ddfa0c8ab4fc3f


export default class RegistWait extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
<<<<<<< HEAD
			studentID: this.props.studentID,
		};
		setTimeout(async () => {
			let response = await getRegistData(this.props.studentID);
			console.log("construc");
			console.log(response);
			this.setState({
				registSubject: response
			})
		}, 0);
=======
			studentID: this.props.studentID
		};
>>>>>>> 42d6cb58b666b2bcc2faeb71b0ddfa0c8ab4fc3f
	}

	render() {
		return (
			<div className = 'registWaitContainer'>
				<h1>ผลการแสดงความจำนงการลงทะเบียนเรียน</h1>
				<div className='registConfirmTable'>
					<table>
						<thead>
							<td>ลำดับ</td>
							<td>รหัสวิชา</td>
							<td>ชื่อวิชา</td>
							<td>Section</td>
						</thead>
						<tbody>
							{_.get(this.state, 'registSubject', []).map((registSubj,idx) => (
								<tr>
									<td><h4>{idx+1}</h4></td>
<<<<<<< HEAD
									<td>{registSubj.cid}</td>
									<td>{registSubj.subjectName}</td>
									<td>{registSubj.sec_no}</td>
=======
									<td>{registSubj.subjectID}</td>
									<td>{registSubj.subjectName}</td>
									<td>{registSubj.section.join()}</td>
>>>>>>> 42d6cb58b666b2bcc2faeb71b0ddfa0c8ab4fc3f
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

		);

	}



<<<<<<< HEAD
}
=======
}
>>>>>>> 42d6cb58b666b2bcc2faeb71b0ddfa0c8ab4fc3f
