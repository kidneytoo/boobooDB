import React from 'react';
import ReactDOM from 'react-dom';

function calculateSection(regSubj) {
		var registSubject_before = regSubj;
		var registSubject_after = [];

		//ถ้าเช็คว่ามี Section อะไรบ้างจาก Database ได้จะดี

		for (var i = 0; i < registSubject_before.length ; i++) {
			var sect = [];
			if(registSubject_before[i].oper == "only") {
				sect.push(registSubject_before[i].sectionf);
			}
			else if(registSubject_before[i].oper == "or") {
				sect.push(registSubject_before[i].sectionf);
				sect.push(registSubject_before[i].sectionl);
			}
			else if(registSubject_before[i].oper == "to") {
				for(var j = registSubject_before[i].sectionf ; j <= registSubject_before[i].sectionl ; j++) {
					sect.push(j)
				}
			}
			registSubject_after.push({subjectID:registSubject_before[i].subjectID,section:sect});
		}
		console.log(registSubject_after);
		return registSubject_after;
	}

export default class RegistConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			registSubject: calculateSection(this.props.registSubject),
		};
	}

	confirmRegist() {

		//บันทึกรายการลง Database

		alert(`ลงทะเบียนเรียบร้อย`);
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
						<td>Section</td>
					</thead>
					<tbody>
						{this.state.registSubject.map((registSubj,idx) => (
							<tr>
								<td><h4>{idx+1}</h4></td>
								<td>{registSubj.subjectID}</td>
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
