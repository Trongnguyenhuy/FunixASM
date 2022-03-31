import React from 'react';
import {
    Card, CardBody, CardTitle, CardText, CardFooter,
    BreadcrumbItem, Breadcrumb, Form, FormGroup, Label, Input, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';


export default function Salary(props) {

    const salary = props.salary.map((item) => {
        return (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 align-self-center">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}
                >
                    <Card className='m-1'>
                        <CardBody>
                            <CardTitle tag='h5'>{item.name}</CardTitle>
                            <CardText>Mã số nhân viên: {item.id}</CardText>
                            <CardText>Hệ số lương: {item.salaryScale}</CardText>
                            <CardText>Số giờ làm thêm: {item.overTime}</CardText>
                        </CardBody>
                        <CardFooter>
                            Lương: {item.salary}
                        </CardFooter>
                    </Card>
                </FadeTransform>
            </div>

        );
    })
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess !== null) {

        return (
            <div className="container">
                <div className="row" style={{ color: 'white' }}>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.salary !== null) {
        return (
            <div className="container">
                <div className="row mt-2">
                    <Breadcrumb>
                        <Link to="/stafflist">Nhân Viên</Link>
                        <BreadcrumbItem>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Bảng Lương
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 mb-2 border-bottom border-secondary" style={{ color: 'white'}}>
                    <div className="col-6 offset-md-3">
                        <Form>
                            <FormGroup row>
                                <Label htmlFor='sort' md={4}>Sắp xếp:</Label>
                                <Col md={8}>
                                    <Input
                                        id="sort"
                                        name="sort"
                                        type="select"
                                        onChange={(event)=>{
                                            props.sortSalary(
                                                event.target.value
                                            )
                                        }}
                                        value={props.sortSalaryOption}
                                    >
                                        <option value="heso">
                                            Theo Hệ Số Lương
                                        </option>
                                        <option value="luong">
                                            Theo Mức Lương
                                        </option>
                                        <option value="phongban">
                                            Theo Phòng Ban
                                        </option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {salary}
                </div>
            </div>
        )
    }
}
