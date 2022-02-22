import { Component } from 'react';
import { Card, CardText, CardBody, CardHeader } from "reactstrap";
import dateFormat from 'dateformat';

export default class StaffInfo extends Component {

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

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 m1-1">
                    {this.renderStaff(this.props.staff)}
                </div>
            </div>
        )
    }
}
