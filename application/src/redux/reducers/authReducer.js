import { LOGIN, LOGOUT } 		from '../actions/types';

const INITIAL_STATE 			= { email: null, token: null };

// getting error "Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export" and needed to declare const first before it can export
 const authReducer = (state = INITIAL_STATE, action) => {
	 debugger
    switch (action.type) {
        case LOGIN:
            // storing email and token form action.payload
            return { ...state, email: action.payload.email, token: action.payload.token }
        case LOGOUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}

export default authReducer;