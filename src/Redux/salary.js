import * as ActionTypes from './actionTypes';

export const salary = (state = {
    isLoading: true,
    errMess: null,
    salary: [],
    sortSalaryOption: null
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SALARY:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                salary: action.payload
            }
        case ActionTypes.SALARY_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                salary: []
            }
        case ActionTypes.SALARY_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                salary: []
            }
        case ActionTypes.SORT_SALARY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                salary: action.payload.salary,
                sortSalaryOption:action.payload.option
            }
        default:
            return state;
    }
}