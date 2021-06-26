import axios                        from 'axios';
import { SERVER_IP }                from '../../private';

    
    const getOrders = () => {
        return axios.get(`${SERVER_IP}/api/current-orders`)
                    .then(res => {
                        return res;
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    const deleteOrder = (order) => {
        console.log("Delete Order");
        console.log(order);
        return axios.delete(`${SERVER_IP}/api/delete-order/${order._id}`, {
            headers: {
                "Content-Type": "application/json"
              }
        }).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

    }

    export { getOrders, deleteOrder };