const initialState = {
};

export const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ERRORS':
            return action.payload.message;
        default:
            return state;
    }
}