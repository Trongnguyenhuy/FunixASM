import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shares/baseUrl';

export const addStaff = (
    staffName,
    staffDoB,
    staffSalaryScale,
    staffStartDate,
    staffDepartment,
    staffAnnualLeave,
    staffOverTime
) => ({
    type: ActionTypes.ADD_STAFF,
    payload: {
        name: staffName,
        doB: staffDoB,
        salaryScale: staffSalaryScale,
        startDate: staffStartDate,
        departmentId: staffDepartment,
        annualLeave: staffAnnualLeave,
        overTime: staffOverTime,
        image: '/assets/images/alberto.png',
    }
});

export const fetchStaff = () => (dispatch) => {
    dispatch(staffLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(staffs => dispatch(renderStaffs(staffs)))
        .catch(error => dispatch(staffFailed(error.message)));
}


export const staffLoading = () => ({
    type: ActionTypes.STAFF_LOADING
});

export const staffFailed = (errMess) => ({
    type: ActionTypes.STAFF_FAILED,
    payload: errMess
});

export const renderStaffs = (staffs) => ({
    type: ActionTypes.RENDER_STAFF,
    payload: staffs
});


export const fetchDepartment = () => (dispatch) => {
    dispatch(departmentLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response =>{
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error: ' + response.status 
                    + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },error =>{
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(departments => dispatch(addDepartment(departments)))
        .catch(error => dispatch(departmentFailed(error.message)));
}

export const departmentLoading = () => ({
    type: ActionTypes.DEPARTMENT_LOADING
});

export const departmentFailed = (errMess) => ({
    type: ActionTypes.DEPARTMENT_FAILED,
    payload: errMess
});

export const addDepartment = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: departments
});

export const fetchSalary = () => (dispatch) => {
    dispatch(salaryLoading());

    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error: ' + response.status 
                    + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(salary => dispatch(addSalary(salary)))
        .catch(error => dispatch(salaryFailed(error.message)));
}

export const addSalary = (salary) => ({
    type: ActionTypes.ADD_SALARY,
    payload: salary
})

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING
})

export const salaryFailed = (errMess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errMess
})


