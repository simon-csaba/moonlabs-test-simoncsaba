import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { errorReducer } from './auth/errorReducer';
import { surveyReducer } from './auth/surveyReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    survey: surveyReducer,
});
