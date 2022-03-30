import * as ActionTypes from './actionTypes';

export const staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: []
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
        case ActionTypes.RENDER_STAFF:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            };
        case ActionTypes.ADD_STAFF:
            var staff = action.payload;
            staff.id = state.staffs.length;
            console.log(state.staffs.length);
            return {
                ...state,
                staffs: [...state.staffs, staff]
            }
        default:
            return state;
    }
}