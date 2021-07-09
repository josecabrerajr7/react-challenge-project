import React                                        from 'react';
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders }       from '../components';
import GuardedRoute                                 from './guarded-routes';

const AppRouter = (props) => {
    return (
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Switch>
                <GuardedRoute path="/order" exact component={OrderForm} meta={{ auth: true }} />
                <GuardedRoute path="/view-orders" exact component={ViewOrders} meta={{ auth: true }} />
            </Switch>
        </Router>
    );
}

export default AppRouter
