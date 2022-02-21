import { Component } from 'react';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import StaffList from './components/StaffListComponent';
import NavbarComponent from './components/NavbarComponent';


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
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', minheight: '2000px' }}>
          <NavbarComponent />
          <StaffList staffs={this.state.staffs} department={this.state.department} />
        </div>
      </div>
    );
  }
}

export default App;
