import { ISLOADING, LOGIN, LOGOUT }        from './types';
import { SERVER_IP }                        from '../../private'

const finishLogin = (email, token) => {
    return {
        type: LOGIN,
        payload: {
            email,
            token
        }
    }
}
// log the user in using there email and password
export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch(isLoading()); // make sure that isLoading still to let GuardedRoute know
        fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                dispatch(finishLogin(response.email, response.token));
            }
        })
    };
}

// logthe user out
export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}

// function to let authReducer is ISLOADING still
export const isLoading = () => {
    return {
        type: ISLOADING,
        payload: null
    }
}