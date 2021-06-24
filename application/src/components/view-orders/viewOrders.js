import React, { Component }			from 'react';
import moment                       from 'moment';
import { Template } 				from '../../components';
import { SERVER_IP } 				from '../../private';
import 								'./viewOrders.css';

class ViewOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    this.setState({ orders: res.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        // convert the created at to the current time it was created and add it was am or pm.
                        const createdDate = moment(order.createdAt).format('hh:mm:ss A');
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at { createdDate }</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success">Edit</button>
                                     <button className="btn btn-danger">Delete</button>
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
