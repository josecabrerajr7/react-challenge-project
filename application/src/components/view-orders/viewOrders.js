import React                            from 'react';
import { getOrders }                    from '../api/order-services';
import { Template }                     from '../../components';
import                                  './viewOrders.css';

class ViewOrders extends React.Component {
   constructor(props) {
       super(props);

        this.state = {
            orders: []
        }
   }

    // getOrders before page loads. Using it's own service page will keep the code much clean. Using axios because it already converts the data into json.
    componentDidMount() {
       getOrders().then(res => {
           this.setState({ orders: res.data.orders });
       });
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    { this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                </div>
                                <div className="col-md-4 view-order-right-col">
                                    <button className="btn btn-success">Edit</button>
                                    <button className="btn btn-danger"
                                            onClick={ e => this.deleteOrder(e, order) }>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
