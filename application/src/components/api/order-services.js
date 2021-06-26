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

    export { getOrders };