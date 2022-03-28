/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import DetailStaff from './DetailStaffComponent';
import { STAFFS, DEPARTMENTS } from '../shares/staffs';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

const findDepartmentIndex = (departmentName, departments) => {
    for (let i = 0; i < departments.length; i++) {
        if (departmentName === departments[i].name) {
            return i;
        }
    }
}


export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,
            selectedStaff: STAFFS[0],
            sortOption: 'ten'
        }

        this.handleSort = this.handleSort.bind(this);
    }

    staffSelected = (item) => {
        this.setState({
            selectedStaff: item
        });
    }

    addStaff = (staff) => {
        staff.id = this.state.staffs.length;
        staff.image = '/assets/images/alberto.png';
        staff.department = this.state.departments[findDepartmentIndex(staff.department, this.state.departments)];
        this.setState({
            staffs: [...this.state.staffs, staff]
        })
    }

    updateStaff = (staff) => {
        let aUpdateStaff = this.state.staffs.filter((item) => item.id === staff.id)[0];
        aUpdateStaff.name = staff.name;
        aUpdateStaff.doB = staff.doB;
        aUpdateStaff.salaryScale = staff.salaryScale;
        aUpdateStaff.startDate = staff.startDate;
        aUpdateStaff.department = this.state.departments[findDepartmentIndex(staff.department, this.state.departments)];
        aUpdateStaff.annualLeave = staff.annualLeave;
        aUpdateStaff.overTime = staff.overTime;

    }

    removeStaff = (staffId) => {

        let aRemoveStaff = [
            ...this.state.staffs.slice(0, staffId),
            ...this.state.staffs.slice(staffId + 1, this.state.staffs.length)
        ];


        for (let i = 0; i < aRemoveStaff.length; i++) {
            aRemoveStaff[i].id = i;
        }

        this.setState({
            staffs: aRemoveStaff
        })
    }

    searchStaff = (sWord) => {

        let sState = [...this.state.staffs.filter((staff) => staff.name.toLowerCase().includes(sWord.toLowerCase()))];
        let sSTAFF = [...STAFFS.filter((staff) => staff.name.toLowerCase().includes(sWord.toLowerCase()))];

        console.log(sState.length);
        console.log(sSTAFF.length);


        if (sState.length === 0 && sSTAFF.length === 0) {
            this.setState({
                staffs: []
            });
        } else if (sState.length !== 0 && sSTAFF.length === 0) {
            this.setState({
                staffs: sState
            });
        } else if (sState.length === 0 && sSTAFF.length !== 0) {
            this.setState({
                staffs: sSTAFF
            });
        } else {
            let aSearchStaff = [...sSTAFF];

            for (let i = 0; i < sSTAFF.length; i++) {
                for (let j = 0; j < sState.length; j++) {
                    if (sState[j].id !== sSTAFF[j].id) {
                        aSearchStaff.push(sState[j]);
                    }
                }
            }

            this.setState({
                staffs: aSearchStaff
            });

        }

    }

    handleSort(event) {

        switch (event.target.value) {
            case 'ten':
                this.setState({
                    sortOption: 'ten',
                    staffs: this.state.staffs.sort(function (a, b) {
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
                    staffs: this.state.staffs.sort(function (a, b) {
                        return (a.salaryScale * 3000000 + a.overTime * 200000) - (b.salaryScale * 3000000 + b.overTime * 200000);
                    })
                });
                break;
            case 'ma':
                this.setState({
                    sortOption: 'ma',
                    staffs: this.state.staffs.sort(function (a, b) {
                        return a.id - b.id;
                    })
                });
                break;
            default:
                this.setState({
                    staffs: STAFFS
                });
        }
    }

    render() {

        const StaffWithId = ({ match }) => {
            return (
                <DetailStaff item={this.state.staffs.filter((item) => item.id === parseInt(match.params.staffId, 10))[0]}
                    department={this.state.departments}
                    updateStaff={this.updateStaff}
                />
            );
        }

        return (
            <div>
                <Header searchStaff={this.searchStaff}/>
                <Switch>
                    <Route exact path="/stafflist" component={
                        () => <StaffList
                            staffs={this.state.staffs}
                            staffSelected={this.staffSelected}
                            addStaff={this.addStaff}
                            handleSort={this.handleSort}
                            sortOption={this.state.sortOption}
                            removeStaff={this.removeStaff}
                        />}
                    />
                    <Route path="/stafflist/:staffId" component={StaffWithId} />
                    <Route path="/department" component={
                        () => <Department departments={this.state.departments}
                            staffs={this.state.staffs}
                        />
                    }
                    />
                    <Route path="/salary" component={
                        () => <Salary staffs={this.state.staffs}
                            handleSort={this.handleSort}
                            sortOption={this.state.sortOption}
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
