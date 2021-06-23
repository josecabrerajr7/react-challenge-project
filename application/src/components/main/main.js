import React, { Component } from 'react';
import { connect }			from 'react-redux';
import { Link } 			from 'react-router-dom';
import 						'./main.css';

const mapStateToProps = state => ({
		temp: state.temp
});

class Main extends Component {
	render() {
	console.log('props', this.props);
		return (
			<div className="main-body">
				<h1>Bruce's Diner Ordering Application</h1>
				<h2>Please login to continue</h2>
				<Link to={'/login'}>
					<button className="btn btn-primary">Go To Login</button>
				</Link>
			</div>
		)
	}
}

export default connect(mapStateToProps, null)(Main);
