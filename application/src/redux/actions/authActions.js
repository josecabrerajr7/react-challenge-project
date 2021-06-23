import { LOGIN, LOGOUT }       	from './types';
import { SERVER_IP }			from '../../private';

const finishLogin = (email, token) => {
    return {
        	type: LOGIN,
        	payload: {
			email,
			token,
		}
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(response => {
            if (response.success) {
                dispatch(finishLogin(response.email, response.token));
            }
        })
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}