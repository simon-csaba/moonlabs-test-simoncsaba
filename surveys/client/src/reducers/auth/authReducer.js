const initialState = {
    isAuthenticated: false,
    user: {}
};

export const authReducer = (state = initialState, action) => {  
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOUGOUT_USER':
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        default:
            return state;
    }
};