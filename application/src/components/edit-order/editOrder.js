import React                from 'react';
import { Modal, Button }    from "react-bootstrap";


class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);

        this.state = {
            showModal: false, 
            hideModal: false,
            ownUpdate: false,
            expanded: false,
            order: {
                _id: null,
                order_item: null,
                ordered_by: null,
                quantity: null,
                updatedAt: null,
                createdAt: null
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.ownUpdate === false && nextProps.isShow === true && prevState.showModal === false) {
            return ({ 
                showModal: true, 
                order: {
                    _id: nextProps.order._id,
                    order_item: nextProps.order.order_item,
                    ordered_by: nextProps.order.ordered_by,
                    quantity: nextProps.order.quantity,
                    updatedAt: nextProps.order.updatedAt,
                    createdAt: nextProps.order.createdAt
                }
            }) // <- this is setState equivalent
        } else if(nextProps.order !== prevState.order && prevState.expanded === true) {
            return ({ 
                showModal: true, 
                order: {
                    _id: nextProps.order._id,
                    order_item: prevState.order.order_item,
                    ordered_by: nextProps.order.ordered_by,
                    quantity: prevState.order.quantity,
                    updatedAt: nextProps.order.updatedAt,
                    createdAt: nextProps.order.createdAt
                }
            }) // <- this is setState equivalent
        }
        return null;
      }

    orderItemHandler(e) {
        this.setState({ expanded: true, order: { order_item: e.target.value, quantity: this.state.order.quantity } });
    }

    orderQuantityHandler(e) {
        this.setState({ expanded: true, order: { order_item: this.state.order.order_item, quantity: e.target.value } });
    }

    handleSave() {
        this.setState({ ownUpdate: false, expanded: false });
        const order = this.state.order;
        this.props.saveModalDetails(order);
        this.closeModal();
    }

    closeModal() {
        this.setState({ showModal: false, hideModal: true,  ownUpdate: false, expanded: false });
        this.props.cancelModalDetails(false);
    }

    hideModal() {
        this.setState({ showModal: false, hideModal: true, ownUpdate: false, expanded: false });
        this.props.cancelModalDetails(false);
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={() => this.hideModal()}>
                <Modal.Header>Edit Bruce's Diner</Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="form-label">I'd like to order...</label>
                        <br />
                        {/* the options can be stored in the database as (strings) and return instead of having it in the all in the render */}
                        <select value={this.state.order.order_item} 
                                onChange={(event) => this.orderItemHandler(event)}
                                className="menu-select">
                                    <option value="" defaultValue disabled hidden>Lunch menu</option>
                                    <option value="Soup of the Day">Soup of the Day</option>
                                    <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                                    <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                                    <option value="Chili Con Carne">Chili Con Carne</option>
                        </select><br />
                        <label className="qty-label">Qty:</label>
                        {/* value should be stored in database as an integer */}
                        <select value={this.state.order.quantity} onChange={(event) => this.orderQuantityHandler(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success"
                            onClick={() => this.handleSave() }>Update</Button>{' '}
                    <Button variant="outline-danger"
                            onClick={() => this.closeModal() }>Close</Button>{' '}
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditModal;

