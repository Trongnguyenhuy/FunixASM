/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import DetailStaff from './DetailStaffComponent';
import RenderDetailDepartment from './DetailDepartment';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStaff, fetchStaff, fetchDepartment, fetchSalary } from '../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        salary: state.salary
    };
}

const mapDispatchToProps = (dispatch) => ({
    addStaff: (
        staffName,
        staffDoB,
        staffSalaryScale,
        staffStartDate,
        staffDepartment,
        staffAnnualLeave,
        staffOverTime
    ) => dispatch(addStaff(
        staffName,
        staffDoB,
        staffSalaryScale,
        staffStartDate,
        staffDepartment,
        staffAnnualLeave,
        staffOverTime
    )),

    fetchStaff: () => { dispatch(fetchStaff()) },
    fetchDepartment: () => { dispatch(fetchDepartment()) },
    fetchSalary: () => { dispatch(fetchSalary()) },
});


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: this.props.staffs[0],
            sortOption: 'ten',
            searchArray: [],
            sortArray: []
        }

        this.handleSort = this.handleSort.bind(this);
    }

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepartment();
        this.props.fetchSalary();
    }

    staffSelected = (item) => {
        this.setState({
            selectedStaff: item
        });
    }


    searchStaff = (sWord) => {
        let aSearchStaff = [...this.props.staffs.staffs.filter((staff) => staff.name.toLowerCase().includes(sWord.toLowerCase()))];

        this.setState({
            searchArray: aSearchStaff
        })
    }

    handleSort(event) {

        switch (event.target.value) {
            case 'ten':
                this.setState({
                    sortOption: 'ten',
                    sortArray: this.props.staffs.staffs.sort(function (a, b) {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                    })
                });
                break;
            case 'luong':
                this.setState({
                    sortOption: 'luong',
                    sortArray: this.props.staffs.staffs.sort(function (a, b) {
                        return (a.salaryScale * 3000000 + a.overTime * 200000) - (b.salaryScale * 3000000 + b.overTime * 200000);
                    })
                });
                break;
            case 'ma':
                this.setState({
                    sortOption: 'ma',
                    sortArray: this.props.staffs.staffs.sort(function (a, b) {
                        return a.id - b.id;
                    })
                });
                break;
            default:
                this.setState({
                    sortArray: this.props.staffs.staffs
                });
        }
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
                    updateStaff={this.updateStaff}
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
                <Header searchStaff={this.searchStaff} />
                <Switch>
                    <Route exact path="/stafflist" component={
                        () => <StaffList
                            staffs={this.state.searchArray.length >= 1 ? this.state.searchArray :
                                this.state.sortArray.length >= 1 ? this.state.sortArray : this.props.staffs.staffs}
                            staffSelected={this.staffSelected}
                            addStaff={this.props.addStaff}
                            handleSort={this.handleSort}
                            sortOption={this.state.sortOption}
                            removeStaff={this.removeStaff}
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
                            salary={this.state.searchArray.length >= 1 ? this.state.searchArray :
                                this.state.sortArray.length >= 1 ? this.state.sortArray : this.props.salary.salary}
                            handleSort={this.handleSort}
                            sortOption={this.state.sortOption}
                            isLoading={this.props.salary.isLoading}
                            errMess={this.props.salary.errMess}
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
