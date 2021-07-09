import React                    from 'react';
import { Route, Redirect }      from 'react-router-dom';
import { connect }              from 'react-redux';


// passing in the GuardedRoute from appRouter. this will always keep checking if the user that visit the guarded pages have right to view them
const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        { ...rest } 
        render={props => {    
            // if auth.isLoading is set to false return loading  
            if(auth.isLoading) {            
                return <h2>Laoding...</h2>;
                // if auth.token is null because a user have not sign in yet redirect them to the login screen
            } else if(auth.token === null) {            
                return <Redirect to="/login" />;
            } else {
                // If all other statements does not run and and everything is good. return the components.
                return <Component { ...props }/>;
            }
        }}
    />
);

const mapStateToProps = (state) => ({ 
    auth: state.auth 
});

export default connect(mapStateToProps)(GuardedRoute);