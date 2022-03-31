/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import DetailStaff from './DetailStaffComponent';
import RenderDetailDepartment from './DetailDepartment';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    fetchStaff, fetchDepartment, fetchSalary, 
    updateStaff, removeStaff, searchStaff, sortStaff, postStaff, 
    sortSalary 
} from '../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        salary: state.salary,
        sortSalaryOption: state.salary.sortSalaryOption,
        sortStaffOption: state.staffs.sortStaffOption
    };
}

const mapDispatchToProps = (dispatch) => ({
    postStaff: (data) => dispatch(postStaff(data)),
    fetchStaff: () => { dispatch(fetchStaff()) },
    fetchDepartment: () => { dispatch(fetchDepartment()) },
    fetchSalary: () => { dispatch(fetchSalary()) },
    updateStaff: (data) => { dispatch(updateStaff(data)) },
    removeStaff: (staffId,staffName) => { dispatch(removeStaff(staffId,staffName)) },
    searchStaff: (sWord) => { dispatch(searchStaff(sWord)) },
    sortStaff: (option) => { dispatch(sortStaff(option)) },
    sortSalary: (option) => {dispatch(sortSalary(option))}
});


class Main extends Component {
   
    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepartment();
        this.props.fetchSalary();
    }

    render() {
        const StaffWithId = ({ match }) => {

            return (
                <DetailStaff staff={this.props.staffs.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]}
                    staffIsLoading={this.props.staffs.isLoading}
                    staffErrMess={this.props.staffs.errMess}
                    departments={this.props.departments.departments}
                    departmentIsLoading={this.props.departments.isLoading}
                    departmentErrMess={this.props.departments.errMess}
                    updateStaff={this.props.updateStaff}
                />
            );
        }

        const departmentWithId = ({ match }) => {
            return (
                <RenderDetailDepartment
                    staffs={this.props.staffs.staffs.filter((item) => item.departmentId === match.params.departmentId)}
                    departmentName={this.props.departments.departments.filter((item) => item.id === match.params.departmentId)[0]}
                    staffIsLoading={this.props.staffs.isLoading}
                    staffErrMess={this.props.staffs.errMess}
                    departments={this.props.departments.departments}
                    departmentIsLoading={this.props.departments.isLoading}
                    departmentErrMess={this.props.departments.errMess}
                    updateStaff={this.updateStaff}
                />
            )
        }

        return (
            <div>
                <Header searchStaff={this.props.searchStaff} />
                <Switch>
                    <Route exact path="/stafflist" component={
                        () => <StaffList
                            staffs={this.props.staffs.staffs}
                            staffSelected={this.staffSelected}
                            postStaff={this.props.postStaff}
                            sortStaff={this.props.sortStaff}
                            sortStaffOption={this.props.sortStaffOption}
                            removeStaff={this.props.removeStaff}
                            staffIsLoading={this.props.staffs.isLoading}
                            staffErrMess={this.props.staffs.errMess}
                            departments={this.props.departments.departments}
                            departmentIsLoading={this.props.departments.isLoading}
                            departmentErrMess={this.props.departments.errMess}
                        />}
                    />
                    <Route path="/stafflist/:staffId" component={StaffWithId} />
                    <Route exact path="/department" component={
                        () => <Department departments={this.props.departments.departments}
                            staffs={this.props.staffs.staffs}
                            staffIsLoading={this.props.staffs.isLoading}
                            staffErrMess={this.props.staffs.errMess}
                            departmentIsLoading={this.props.departments.isLoading}
                            departmentErrMess={this.props.departments.errMess}
                        />
                    }
                    />
                    <Route path="/departments/:departmentId" component={departmentWithId} />
                    <Route path="/salary" component={
                        () => <Salary
                            salary={this.props.salary.salary}
                            sortSalary={this.props.sortSalary}
                            isLoading={this.props.salary.isLoading}
                            errMess={this.props.salary.errMess}
                            sortSalaryOption={this.props.sortSalaryOption}
                        />
                    }
                    />
                    <Redirect to="/stafflist" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
