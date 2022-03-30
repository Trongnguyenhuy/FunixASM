import React from 'react';
import {
    Card, CardImg, CardBody, CardTitle,
    Button, BreadcrumbItem, Breadcrumb
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const RenderDetailDepartment = (props) => {
    if (props.staffIsLoading || props.departmentIsLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.staffErrMess !== null || props.departmentErrMess !== null) {
        console.log(props);
        const errMess = props.staffErrMess !== null ? props.staffErrMess : props.departmentErrMess;
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    } else {

        const staff = props.staffs.map((item) => {
            return (

                <div key={item.id} className="col-12 col-sm-6 col-md-2 align-self-center">
                    <FadeTransform in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}
                    >

                        <Card className='m-1'>
                            <Link to={`/stafflist/${item.id}`}>
                                <CardImg
                                    alt={item.name}
                                    src={item.image}
                                    top
                                    width="100%"
                                    height="auto"
                                />
                            </Link>
                            <CardBody>
                                <CardTitle tag="h6"
                                    style={{
                                        color: 'black'
                                    }}
                                >
                                    {item.name}
                                </CardTitle>
                                <Button onClick={() => { props.removeStaff(item.id) }}
                                >
                                    Xóa
                                </Button>
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
                        <BreadcrumbItem>
                            <Link to="/department">Phòng Ban</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {props.departmentName.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    {staff}
                </div>
            </div>
        );
    }
}

export default RenderDetailDepartment;
