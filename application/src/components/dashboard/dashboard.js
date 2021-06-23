import React, { Component } 	from 'react';
import { connect } 				from 'react-redux';
import { Link } 				from 'react-router-dom';
import 							'./Dasboard.css';

const mapStateToProps = state => ({
	temp: state.temp
});

class Dashboard extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div className="main-body">
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Dashboard);
