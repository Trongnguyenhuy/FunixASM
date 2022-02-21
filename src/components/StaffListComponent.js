import { Component } from "react";
import { Card, CardText, CardBody, CardHeader} from "reactstrap";
import dateFormat from 'dateformat';

class StaffList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectStaff: staff });
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <Card className="mt-2 border border-dark">
                    <CardHeader className="bg-info"><b>Họ và tên: {staff.name}</b></CardHeader>
                    <CardBody className="bg-success">
                        <CardText>Ngày Sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng Ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div>
                    <div className="card mt-2 bg-danger text-center">
                        <div className="card-body">
                            <h4 className="card-title">Bấm vào tên nhân viên để xem thông tin</h4>
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderListStaff = () => {
        return this.props.staffs.map((staff) => {
            return (
                <div className="col-12 col-md-4 col-lg-2 mt-2"
                    key={staff.id}>
                    <div className="card border border-dark"
                        onClick={() => this.onStaffSelect(staff)}
                        style={{ cursor: 'pointer', height: '300px', width: '100%' }}>
                        <img className="card-img-top" src={staff.image} alt={staff.name}
                            style={{ width: '100%' }} />
                        <div className="card-body bg-secondary p-2">
                            <h4 className="card-title text-center">{staff.name}</h4>
                            <span className="card-text">
                                Department: {staff.department.name}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 m1-1">
                        {this.renderStaff(this.state.selectStaff)}
                    </div>
                </div>
                <div className="row">
                    {this.renderListStaff()}
                </div>
            </div>
        );
    }
}

export default StaffList;