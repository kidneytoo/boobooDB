import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Home extends React.Component {
	render() {
		return (
			<div className='homeContainer'>
				<h1>ยินดีต้อนรับสู่ BooBooDB</h1>
			</div>
		);
	}
}






class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			studentID: '',
			registSubject: [{subjectID:'',sectionf:null,oper:"only",sectionl:null}],
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
    	const { studentID, registSubject } = this.state;
    	alert(`รหัสนิสิต ${studentID} ลงทะเบียนทั้งหมด ${registSubject.length} วิชา มีดังนี้`);
  	}



	render() {
		return (
			<div className='registerContainer'>
				<h1>ลงทะเบียนเรียน</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label for="sid">รหัสนิสิต</label>
						<input value={this.state.studentID} onChange={this.handleStudentIDchange} className="sid" type="text" placeholder="10 หลัก" required></input>
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
												<input value={registSubj.sectionf} onChange={this.handleSectionfChange(idx)} disabled = {registSubj.oper === "all"} className="sectionf" type="text" required></input>
												<select name="choice" id='choice' value={registSubj.oper} onChange={this.handleOperChange(idx)}>
													<option value="only">เท่านั้น</option>
													<option value="or">หรือ</option>
													<option value="to">ถึง</option>
													<option value="all">ทั้งหมด</option>
												</select>
												<input value={registSubj.sectionl} onChange={this.handleSectionlChange(idx)} disabled = {registSubj.oper === "only" || registSubj.oper === "all"} className="sectionl" type="text" required></input>
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
					<div><input type="submit"></input></div>
				</form>
			</div>

		);
	}
}






class AddSubject extends React.Component {
	


	render() {
		return (
			<div>
			</div>


		);
	}





}










class Reg extends React.Component {
	constructor() {
		super();
		this.state = {
			window: <Home />
		};
	}

	changeWindow(wind) {
		this.setState ({
			window: wind,
		});
	};


	render() {
		return (
			<div className = 'regAll'>
				<div className = 'menuBar'>
					<h1>BooBooDB</h1>
					<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
					<div className = 'menuChoice'>
						<button onClick={() => this.changeWindow(<Register />)}>ลงทะเบียนเรียน</button>
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














ReactDOM.render(
  <Reg />,
  document.getElementById('root')
);