const initialState = {
    survey: [],
};

export const surveyReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_SURVEYS':
            return {
                ...state,
                survey: action.payload,
            };
        default:
            return state;
    }
}