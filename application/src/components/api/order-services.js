import axios                        from 'axios';
import { SERVER_IP }                from '../../private';
const config                        = { headers: {'Content-Type': 'application/json'} };

    
    const getOrders = () => {
        return axios.get(`${SERVER_IP}/api/orders`)
                    .then(res => {                        
                        return res;
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    const editOrder = (order) => {

        return axios.put(`${SERVER_IP}/api/edit-order/${order._id}`, order, config)
                    .then(res => {
                        return;
                    })
                    .catch(err => {
                        console.log(err);
                    });
    };

    const deleteOrder = (order) => {
        return axios.delete(`${SERVER_IP}/api/delete-order/${order._id}`, config).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteAllOrders = () => {
        return axios.delete(`${SERVER_IP}/api/delete-all`).then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
    }


    export { getOrders, editOrder, deleteOrder, deleteAllOrders };