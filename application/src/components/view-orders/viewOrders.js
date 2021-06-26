import React                            from 'react';
import { getOrders, deleteOrder }       from '../api/order-services';
import { Template }                     from '../../components';
import                                  './viewOrders.css';

class ViewOrders extends React.Component {
   constructor(props) {
       super(props);

        this.state = {
            orders: []
        }
   }

    componentDidMount() {
       this.getAllOrders();
    }

    // function to get All Orders
    getAllOrders() {
        getOrders().then(res => {
            this.setState({ orders: res.data.orders });
        });
    }

    // delete order and return all order in the view
    deleteOrder(e, order) {
        e.preventDefault();
        if (confirm('Do you want to delete this order?')) {
            deleteOrder(order).then(res => {
                this.getAllOrders();
            });
        } else {
            alert("Order was not delete");
        }
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
