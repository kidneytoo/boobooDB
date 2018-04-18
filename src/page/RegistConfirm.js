import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import _ from 'lodash'

var t;
var axios = require('axios');


function calculateSection(regSubj) {
	console.log("CALLLLL");
	var registSubject_before = regSubj;
	var registSubject_after = [];

	return new Promise(async (resolve, reject) => {
		for (var i = 0; i < registSubject_before.length ; i++) {
			console.log("come");

			// add existing subject's section to sectionExisting

			await (async (i) => {
				try{
					var subjectID = registSubject_before[i].subjectID;
					var oper = registSubject_before[i].oper;
					var sectionf = parseInt(registSubject_before[i].sectionf);
					var sectionl = parseInt(registSubject_before[i].sectionl);
					var sectionExisting;
					var sect = [];
					var subjName = (await axios.post('http://localhost:8888/student/register/reqSubjectName', {"subjectID":subjectID})).data.data; //ชื่อวิชา
					console.log("subjName");
					console.log(subjName);
					// console.log(subjName.data);

					var response = await axios.post('http://localhost:8888/student/register/reqAllSection', {"subjectID":subjectID});

					console.log('req_allSection success - data:');
					console.log(response);
					sectionExisting = response.data.data ;
					console.log(sectionExisting);
					console.log(response.data.msg);

					var checkSec = (section) => {
						return sectionExisting.reduce((acc, it) => {
							if(it.sec_no == section) return true;
							return acc;
						}, false)
					};

					if(oper == "only" && checkSec(sectionf)) {
						sect.push(sectionf);
					}
					else if(oper == "or") {
						if(checkSec(sectionf))
							sect.push(sectionf);
						if(checkSec(sectionl))
							sect.push(sectionl);
					}
					else if(oper == "to") {
						for(var j = sectionf ; j <= sectionl ; j++) {
							if(checkSec(j))
								sect.push(j)
						}
					}
					else if(oper == 'all'){
						sectionExisting.forEach((secObj) => {
							sect.push(secObj.sec_no);
						})
					}

					console.log(sect);
					registSubject_after.push({subjectID:subjectID,section:sect,subjectName:subjName});

				} catch(e){
					console.log("Catch in reqAllSection")
				}
			})(i);
		}
		resolve("success");
	}).then((successMsg) => {
		console.log(registSubject_after);
		return registSubject_after;
	})

	//ถ้าเช็คว่ามี Section อะไรบ้างจาก Database ได้จ

}

export default class RegistConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
		};
		setTimeout(async () => {
			let response = await calculateSection(this.props.registSubject)
			this.setState({
				registSubject: response
			})
		}, 0);
	}

	confirmRegist() {

		//บันทึกรายการลง Database
		console.log(this.state.registSubject);
		$.post('http://localhost:8888/student/register/storeToRegIn', this.state , function(data , status){
			console.log('req_allSection success - data:');
			console.log(data);
			alert("Storing successful");
		});

		this.props.setInit();
		this.props.goHome();
	};
	render() {
		return(
			<div className='registConfirmContainer'>
			<h1>ยืนยันการลงทะเบียนเรียน</h1>
			<p>รหัสนิสิต : {this.props.studentID}</p>
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
				<td>{registSubj.subjectID}</td>
				<td>{registSubj.subjectName}</td>
				<td>{registSubj.section.join()}</td>
				</tr>
			))}
			</tbody>
			</table>
			</div>
			<div>
			<button onClick={this.props.backWindow}>ย้อนกลับ</button>
			<button onClick={this.confirmRegist.bind(this)}>บันทึก</button>
			</div>
			</div>

		);
	}
}
