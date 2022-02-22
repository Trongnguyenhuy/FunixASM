import { Component } from 'react';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import StaffList from './components/StaffListComponent';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/footerComponent';
import StaffInfo from './components/StaffInfo';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      department: DEPARTMENTS,
      selectStaff: null
    };
  }

  onStaffSelect(staffId) {
    this.setState({ selectStaff: staffId });
  }


  render() {
    return (
      <div className="App"
        style={{ backgroundImage: 'url(./assets/images/employeeCard.jpg)' }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', minheight: '2000px' }}>
          <NavbarComponent />
          <StaffInfo staff={this.state.staffs.filter(
            (staff) => staff.id === this.state.selectStaff)[0]}/>
          <StaffList staffs={this.state.staffs}
            department={this.state.department}
            onClick={(staffId) => this.onStaffSelect(staffId)} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
