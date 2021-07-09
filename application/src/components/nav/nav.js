import React                        from "react";
import { connect }                  from "react-redux";
import { Link, withRouter }         from "react-router-dom";
import { logoutUser }               from "../../redux/actions/authActions";
import                              "./nav.css";



const mapActionsToProps = dispatch => {
    return {
        commenceLogout: () => { dispatch(logoutUser()) }
    }
}
	

const mapStateToProps = state => ({
	auth: state.auth
});

class Nav extends React.Component {


    logUserOut = () => {
        this.props.commenceLogout();
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div className="nav-strip">
                <Link to={"/order"} 
                      className="nav-link">
                    <div className="nav-link-style">
                        <label className="nav-label">Order Form</label>
                    </div>
                </Link>
                <Link to={"/view-orders"} 
                      className="nav-link" 
                      id="middle-link">
                    <div className="nav-link-style">
                        <label className="nav-label">View Orders</label>
                    </div>
                </Link>
                <div className="nav-link-style">
                    {/* <label className="nav-label" >Log Out</label> */}
                    <button className="nav-link btn btn-danger" onClick={() => this.logUserOut()}>Log Out</button>
                </div>
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Nav));