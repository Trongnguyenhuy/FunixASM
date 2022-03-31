import * as ActionTypes from './actionTypes';

export const staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: [],
    sortStaffOption: null
}, action) => {
    switch (action.type) {
        case ActionTypes.STAFF_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                staffs: []
            };
        case ActionTypes.STAFF_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                staffs: []
            };
        case ActionTypes.ADD_STAFFS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            };
        case ActionTypes.ADD_STAFF:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            }
        case ActionTypes.REMOVE_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            }
        case ActionTypes.SEARCH_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            }
        case ActionTypes.SORT_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload.staffs,
                sortStaffOption: action.payload.option
            }
        default:
            return state;
    }
}