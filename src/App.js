import react, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar, NavbarBrand } from 'reactstrap';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import StaffList from './components/StaffListComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      department: DEPARTMENTS
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} department={this.state.department}/>
      </div>
    );
  }
}

export default App;
