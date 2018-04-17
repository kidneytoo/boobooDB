import React from 'react';
import ReactDOM from 'react-dom';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='homeContainer'>
				<h1>ยินดีต้อนรับสู่ BooBooDB</h1>
				<p>{this.props.studentID}</p>
			</div>
		);
	}
}