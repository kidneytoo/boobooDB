import React from 'react';
import ReactDOM from 'react-dom';
import RegistConfirm from './RegistConfirm'
import $ from 'jquery';

var studID = '';
var registSj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			registSubject: registSj,
		};
	}

	handleStudentIDchange = (evt) => {
		this.setState({ studentID: evt.target.value });
	}

	handleSubjectIDChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, subjectID: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleOperChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, oper: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleSectionfChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, sectionf: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleSectionlChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, sectionl: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

	handleAddRegistSubject = () => {
    this.setState({
      registSubject: this.state.registSubject.concat([{subjectID:'',sectionf:null,oper:"only",sectionl:null}])
    });
  	}

  	handleRemoveRegistSubject = (idx) => () => {
    this.setState({
      registSubject: this.state.registSubject.filter((s, sidx) => idx !== sidx)
    });
  	}

  	handleSubmit = (evt) => {
  		// $.post('http://localhost:8888/send', this.state , function(data , status){
			//   console.log('data: ' + data + ', status: ' + status);
			//   alert('From server => data: ' + data + ', status: ' + status);
			// });

    	studID = this.state.studentID;
    	registSj = this.state.registSubject;
    	this.props.changeWindow(<RegistConfirm studentID={this.state.studentID} registSubject={this.state.registSubject} backWindow={this.props.backWindow} updateState={this.updateState} goHome={this.props.goHome} setInit={this.setInit} />);
  	}

  	setInit = () => {
		studID = '';
		registSj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];
  	}

	render() {
		return (
			<div className='registerContainer'>
				<h1>ลงทะเบียนเรียน</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<p>{this.state.studentID}</p>
					</div>
					<div className='registerFill'>
						<div className='registTable'>
							<table>
								<thead>
									<td>ลำดับ</td>
									<td>รหัสวิชา</td>
									<td>Section</td>
									<td></td>
								</thead>
								<tbody>
									{this.state.registSubject.map((registSubj,idx) => (
										<tr>
											<td>
												<h4>{idx+1}</h4>
											</td>
											<td>
												<input value={registSubj.subjectID} onChange={this.handleSubjectIDChange(idx)} className="subjid_1" type="text" required></input>
											</td>
											<td>
												<input value={registSubj.sectionf} onChange={this.handleSectionfChange(idx)} disabled = {registSubj.oper === "all"} className="sectionf" type="number" required></input>
												<select name="choice" id='choice' value={registSubj.oper} onChange={this.handleOperChange(idx)}>
													<option value="only">เท่านั้น</option>
													<option value="or">หรือ</option>
													<option value="to">ถึง</option>
													<option value="all">ทั้งหมด</option>
												</select>
												<input value={registSubj.sectionl} onChange={this.handleSectionlChange(idx)} disabled = {registSubj.oper === "only" || registSubj.oper === "all"} className="sectionl" type="number" required></input>
											</td>
											<td>
												<button type="button" disabled = {this.state.registSubject.length <= 1} onClick={this.handleRemoveRegistSubject(idx)} className="small">-</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div><button type="button" disabled = {this.state.registSubject.length >=10} onClick={this.handleAddRegistSubject} className="small">เพิ่มวิชาที่จะลงทะเบียน</button></div>
					<div><input type="submit" onclick = {this.handleSubmit}></input></div>
				</form>
			</div>

		);
	}
}
