import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shares/baseUrl';

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
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
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffFailed(error.message)));
}


export const staffLoading = () => ({
    type: ActionTypes.STAFF_LOADING
});

export const staffFailed = (errMess) => ({
    type: ActionTypes.STAFF_FAILED,
    payload: errMess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});
//Search staff
export const searchStaffSuccess = (staffs) => ({
    type: ActionTypes.SEARCH_STAFF_SUCCESS,
    payload: staffs
})

export const searchStaff = (sWord) => (dispatch) => {
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
        .then(staffs => {
            var arraySearch = staffs.filter((staff) => staff.name.toLowerCase().includes(sWord.toLowerCase()));
            dispatch(searchStaffSuccess(arraySearch))
        })
        .catch(error => dispatch(staffFailed(error.message)));
}

//Sort staff

export const sortStaffSuccess = (staffs, option) => ({
    type: ActionTypes.SORT_STAFF_SUCCESS,
    payload: {
        staffs: staffs,
        option: option
    }
})

export const sortStaff = (option) => (dispatch) => {
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
        .then(staffs => {

            var arraySort = [];

            switch (option) {
                case 'ten':
                    arraySort = staffs.sort(
                        (a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            return 0;
                        }
                    );
                    break;
                case 'luong':
                    arraySort = staffs.sort(
                        (a, b) => {
                            return (a.salaryScale * 3000000 + a.overTime * 200000) - (b.salaryScale * 3000000 + b.overTime * 200000);
                        }
                    );
                    break;
                case 'Ma':
                    arraySort = staffs.sort(
                        (a, b) => {
                            return a.id - b.id;
                        }
                    );
                    break;
                default:
                    arraySort = staffs;
            }


            dispatch(sortStaffSuccess(arraySort, option));
        })
        .catch(error => dispatch(staffFailed(error.message)));
}

// Post Staff
export const postStaff = (data) => (dispatch) => {
    dispatch(staffLoading(true));
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(staff => dispatch(addStaff(staff)))
        .catch(error => {
            console.log('Post staff', error.message);
            alert('Your staff could not be posted \nError: ' + error.message);
        })
}

//Update staff
export const updateStaff = (data) => (dispatch) => {
    dispatch(staffLoading(true));
    return fetch(baseUrl + 'staffs', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(staff => dispatch(addStaff(staff)))
        .catch(error => {
            console.log('Update staff: ', error.message);
            alert('Your staff could not be updated \nError: ' + error.message);
        })
}

//Remove staff: 
export const removeStaff = (staffId, staffName) => (dispatch) => {
    let text = `Bạn có thực sự muốn xóa nhân viên ${staffName} ?`;
    if (window.confirm(text) === true) {
        dispatch(staffLoading(true));
        return fetch(
            baseUrl + 'staffs/' + staffId,
            {
                method: 'DELETE'
            }
        ).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            }
        ).then(response => {
            dispatch(removeStaffSuccess(response));
            console.log("remove successfully!");
        }).catch(error => {
            console.log('remove staff: ', error);
        })
    } else {
        console.log("You canceled!");
    }
}

export const removeStaffSuccess = (staffs) => ({
    type: ActionTypes.REMOVE_STAFF_SUCCESS,
    payload: staffs
});

// Fetch Department
export const fetchDepartment = () => (dispatch) => {
    dispatch(departmentLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
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
            if (response.ok) {
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

//Sort salary 
export const sortSalarySuccess = (salary, option) => ({
    type: ActionTypes.SORT_SALARY_SUCCESS,
    payload: {
        salary: salary,
        option: option
    }
})

export const sortSalary = (option) => (dispatch) => {
    dispatch(salaryLoading(true));

    return fetch(
        baseUrl + 'staffsSalary',
        {
            method: 'GET'
        }
    ).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        }
    ).then(
        salary => {
            let arraySort = [];

            switch (option) {
                case 'heso':
                    arraySort = salary.sort(
                        (a, b) => {
                            return a.salaryScale - b.salaryScale;
                        }
                    );
                    break;
                case 'luong':
                    arraySort = salary.sort(
                        (a, b) => {
                            return a.salary - b.salary;
                        }
                    );
                    break;
                case 'phongban':
                    arraySort = salary.sort(
                        (a, b) => {
                            let deptA = a.departmentId.toLowerCase();
                            let deptB = b.departmentId.toLowerCase();

                            if (deptA < deptB) {
                                return -1;
                            } else if (deptA > deptB) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    );
                    break;
                default:
                    arraySort = salary;
            }

            dispatch(sortSalarySuccess(arraySort, option));
        }
    ).catch(error => dispatch(salaryFailed(error.message)))
}
