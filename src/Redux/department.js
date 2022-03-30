import * as ActionTypes from './actionTypes';

export const departments = (state={
    isLoading: true,
    errMess: null,
    departments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.DEPARTMENT_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                departments: [] 
            }
        case ActionTypes.DEPARTMENT_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                departments: [] 
            }
        case ActionTypes.ADD_DEPARTMENT:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                departments: action.payload 
            }
        default:
            return state;
    }
}