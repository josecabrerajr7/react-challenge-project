const INITIAL_STATE = { test: '' };

// getting error "Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export" and needed to declare const first before it can export
const tempReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
}

export default tempReducer;