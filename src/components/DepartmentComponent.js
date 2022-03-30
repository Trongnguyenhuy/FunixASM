import React from 'react';
import { Card, CardBody, CardTitle, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';



export default function Department(props) {

    if (props.staffIsLoading || props.departmentIsLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.staffErrMess !== null || props.departmentErrMess !== null) {

        const errMess = props.staffErrMess !== null ? props.staffErrMess : props.departmentErrMess;
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    } else if (props.staffs !== null && props.departments !== null) {
        const department = props.departments.map((item, index) => {
            return (
                <div key={item.id} className="col-12 col-sm-6 col-md-4 align-self-center">
                    <FadeTransform in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}
                    >
                        <Card className='m-1' style={{ height: '180px', width: '100%'}}>
                            <CardBody>
                                <Link to={`/departments/${item.id}`}>
                                    <CardTitle tag='h5'>{item.name}</CardTitle>
                                    <CardText>
                                        Số lượng nhân viên: {props.staffs.filter((staff) => staff.departmentId === item.id).length}
                                    </CardText>
                                </Link>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row mt-2">
                    <Breadcrumb>
                        <Link to="/stafflist">Nhân Viên</Link>
                        <BreadcrumbItem>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Phòng Ban
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    {department}
                </div>
            </div>
        );
    }
}
