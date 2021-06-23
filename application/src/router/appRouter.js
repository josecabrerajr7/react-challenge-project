import React 									from 'react';
import { BrowserRouter as Router, Route } 		from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } 	from '../components';

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/order" exact component={OrderForm} />
      <Route path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
}

export default AppRouter;
