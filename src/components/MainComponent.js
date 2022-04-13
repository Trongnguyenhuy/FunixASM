/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import DetailStaff from './DetailStaffComponent';
import { STAFFS, DEPARTMENTS } from '../shares/staffs';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

// Hàm tìm index của department theo tên department 
const findDepartmentIndex = (departmentName, departments) => {
    for (let i = 0; i < departments.length; i++) {
        if (departmentName === departments[i].name) {
            return i;
        }
    }
}

// Component chính ở đỉnh cấp props cho các component khác bên dưới và lưu trữ
// state của toàn bộ app
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
    
    // method của class Main nhận đối tượng là dữ liệu của một nhân viên được chọn và set dữ liệu 
    // này vào state 
    staffSelected = (item) => {
        this.setState({
            selectedStaff: item
        });
    }


    // Method của class Main nhận vào dữ liệu của form thêm nhân viên sao đó gán id, image và department
    // cho nhân viên vừa được nhập và set vào property staffs của state
    addStaff = (staff) => {
        staff.id = this.state.staffs.length;
        staff.image = '/assets/images/alberto.png';
        staff.department = this.state.departments[findDepartmentIndex(staff.department, this.state.departments)];
        this.setState((state) => {
            state.staffs = [...state.staffs, staff];
        })
    }

    // Method của class Main nhận vào dữ liệu từ form cập nhật sau đó update lại dữ liệu cho nhân viên
    // được cập nhật thông tin bằng cách tìm kiếm nhân viên theo id
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

    // Method của class Main nhận vào là Id của nhân viên muốn xóa, tạo array staffs trong state mới 
    // kèm với việc set lại id cho các nhân viên còn lại trong mảng
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

    // Method của class Main nhận vào từ khóa muốn search sau đó sẽ search nhân viên trong state và trong state
    // files staffs để tìm ra nhân viên cần tìm theo tên
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

    // Method của class Main nhận vào sự kiện chon option sort và sắp xếp nhân viên theo ten, mức lương
    // và id
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
        // Function component nhận vào Object match, lọc ra nhân viên có id tương ứng với staffId trong match
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
                <Header searchStaff={this.searchStaff}/> {/* Component header  */}
                <Switch>
                    {/*exact chỉ định rõ path match khi có nhiều path match*/}
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
