import { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
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
      <div className="App"
        style={{ backgroundImage: 'url(./assets/images/employeeCard.jpg)' }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', minheight: '2000px'}}>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
            </div>
          </Navbar>
          <StaffList staffs={this.state.staffs} department={this.state.department} />
        </div>
      </div>
    );
  }
}

export default App;
