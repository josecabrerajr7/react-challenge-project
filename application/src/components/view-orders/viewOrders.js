import React                                            from 'react';
import { getOrders, 
         editOrder, 
         deleteOrder, 
         deleteAllOrders }                              from '../api/order-services';
import { Template }                                     from '../../components';
import EditModal                                        from '../edit-order/editOrder';

class ViewOrders extends React.Component {
   constructor(props) {
       super(props);

       this.replaceModalItem    = this.replaceModalItem.bind(this);
       this.saveModalDetails    = this.saveModalDetails.bind(this);
       this.cancelModalDetails  = this.cancelModalDetails.bind(this);

        this.state = {
            isShow: false,
            requiredItem: 0,
            orders: [
                {
                    _id: null,
                    order_item: null,
                    ordered_by: null,
                    quantity: null
                }
            ]
        }
   }

    componentDidMount() {
        this.getAllOrders();
    }

    // function to get All Orders
    async getAllOrders() {
        await getOrders().then(res => {
           this.setState({ orders: res.data.orders });
        });
    }

    // delete order and return all order in the view
    deleteOrder(e, order) {
        e.preventDefault();
        if (window.confirm('Do you want to delete this order?')) {
            deleteOrder(order).then(res => {
                this.getAllOrders();
            });
        } else {
            alert("Order was not delete");
        }
    }

    replaceModalItem(index) {
        this.setState({ isShow: true });
        this.setState({
            requiredItem: index
        });
    }

   saveModalDetails(order) {
        this.setState({ isShow: false });
         editOrder(order).then(res => {
            this.getAllOrders();
        });
    }

    cancelModalDetails(cancel) {
        this.setState({ isShow: cancel });
    }

    deleteAllOrdersBtn(e) {
        e.preventDefault();
        deleteAllOrders().then(res => {
            this.getAllOrders();
            alert("all orders have been deleted");            
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() { 
        const order = this.state.orders.map((order, index) => {
            const createdDate = new Date(order.createdAt);
                return (
                    <div className="row view-order-container p-3" key={index}>
                        <div className="col-md-5 view-order-left-col">
                            <h2>{order.order_item}</h2>
                            <p>Ordered by: { order.ordered_by || ''}</p>
                        </div>
                        <div className="col-md-3 d-flex view-order-middle-col">
                            <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                            <p>Quantity: {order.quantity}</p>
                        </div>
                        <div className="col-md-4 view-order-right-col">
                            <button type="button" 
                                    className="btn btn-success mr-1" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#editModal"
                                    onClick={ () => this.replaceModalItem(index) }>Edit</button>
                            <button className="btn btn-danger"
                                    onClick={ e => this.deleteOrder(e, order) }>Delete</button>
                        </div>
                    </div>
                )
            }
        );

        const requiredItem = this.state.requiredItem;
        let modalData = { order: this.state.orders[requiredItem] };

        return(
            <Template>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                        <button className="btn btn-danger mt-3 float-end"
                                disabled={this.state.orders.length === 0}
                                onClick={ e => this.deleteAllOrdersBtn(e) }>Delete All Orders</button>
                        </div>
                    </div>
                    {order}
                <EditModal order={modalData.order} 
                           saveModalDetails={this.saveModalDetails}
                           cancelModalDetails={this.cancelModalDetails}
                           isShow={this.state.isShow} />
                </div>
            </Template>
        )
    }
}
        

export default ViewOrders;
