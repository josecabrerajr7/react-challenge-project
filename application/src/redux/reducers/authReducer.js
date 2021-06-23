import { LOGIN, LOGOUT } 		from '../actions/types';

const INITIAL_STATE = { email: null, token: null };

// getting error "Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export" and needed to declare const first before it can export
 const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, email: action.payload.login, token: action.payload.token }
        case LOGOUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}

export default authReducer;