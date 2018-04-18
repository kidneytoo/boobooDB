import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import _ from 'lodash'


// ตรงนี้น่าจะเป็น function ดึงข้อมูลนะ ป่ะ
function getRegistSubjec() {
	
}

// ไป setState เป็น registSubject ด้วยจะดี 


export default class RegistWait extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID
		};
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
									<td>{registSubj.subjectID}</td>
									<td>{registSubj.subjectName}</td>
									<td>{registSubj.section.join()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

		);

	}



}