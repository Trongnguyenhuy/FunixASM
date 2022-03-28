import React from 'react';
import {
    Card, CardBody, CardTitle, CardText, CardFooter,
    BreadcrumbItem, Breadcrumb, Form, FormGroup, Label, Input, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

const salaryCalculate = (scale, overTime) => {
    return (scale * 3000000 + overTime * 200000);
}

export default function Salary(props) {

    document.title = `Bảng Lương || Ứng dụng quản lý nhân sự`;

    const salary = props.staffs.map((item) => {
        return (
            <Card key={item.id} className='col-12 col-sm-6 col-md-4 mt-1'>
                <CardBody>
                    <CardTitle tag='h5'>{item.name}</CardTitle>
                    <CardText>Mã số nhân viên: {item.id}</CardText>
                    <CardText>Hệ số lương: {item.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {item.overTime}</CardText>
                </CardBody>
                <CardFooter>
                    <strong>Lương:</strong> {salaryCalculate(parseInt(item.salaryScale), parseInt(item.overTime))}<strong> VND</strong>
                </CardFooter>
            </Card>
        );
    })

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
            <div className="row border-bottom border-secondary mb-2" style={{ color: 'white' }}>
                <div className="col-6 offset-md-3">
                    <Form>
                        <FormGroup row>
                            <Label htmlFor='sort' md={4}>Sắp xếp:</Label>
                            <Col md={8}>
                                <Input
                                    id="sort"
                                    name="sort"
                                    type="select"
                                    onChange={props.handleSort}
                                    defaultValue={props.sortOption}
                                >
                                    <option value="ten">
                                        Theo tên
                                    </option>
                                    <option value="luong">
                                        Theo Lương
                                    </option>
                                    <option value="ma">
                                        Theo Mã Số
                                    </option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
            <div className="row">
                {salary}
            </div>
        </div>
    )
}
