/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle,
    Button, Form, FormGroup, Label, Input, Col, Row,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);




const RenderStaff = ({ staffs, removeStaff }) => {

    if (staffs === []) {
        return (
            <div className="text-center">
                <h3>Nhân viên không tồn tại !!!</h3>
            </div>
        );
    } else {
        const staff = staffs.map((item) => {
            return (
                <div key={item.id} className='col-12 col-md-4 col-lg-2'>
                    <Card key={item.id} className='m-1'
                    >
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
                            <Button onClick={() => { removeStaff(item.id) }}
                            >
                                Xóa
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            );
        });

        return (
            <div className="row">
                {staff}
            </div>
        );
    }
}


class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        this.toggleModal();
        const newStaff = { ...values };
        console.log("Current state is: " + JSON.stringify(values));
        this.props.addStaff(newStaff);
    }

    render() {

        document.title = `Nhân Viên || Ứng dụng quản lý nhân sự`;

        return (
            <div className="container">
                <div className="row mt-2 mb-2 border-bottom border-secondary">
                    <div className="col-6 col-sm-3">
                        <h2 style={{ color: 'white' }}>Nhân Viên</h2>
                    </div>
                    <div className="col-6 col-sm-3 ">
                        <Button
                            className='btn btn-primary'
                            onClick={this.toggleModal}
                        >
                            <span className="fa fa-plus-square-o fa-lg"></span>
                        </Button>
                    </div>
                    <div className="col-12 col-sm-6" style={{ color: 'white' }}>
                        <Form>
                            <FormGroup row>
                                <Label htmlFor='sort' md={4}>Sắp xếp:</Label>
                                <Col md={8}>
                                    <Input
                                        id="sort"
                                        name="sort"
                                        type="select"
                                        onChange={this.props.handleSort}
                                        defaultValue={this.props.sortOption}
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
                <RenderStaff staffs={this.props.staffs} removeStaff={this.props.removeStaff}
                />
                <Modal isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Thêm Nhân Viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Tên:</Label>
                                <Col md={8}>
                                    <Control.text model=".name"
                                        className="form-control"
                                        name="name"
                                        validators={{
                                            required,
                                            MinLength: minLength(2),
                                            MaxLength: maxLength(30),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLength: 'Yêu cầu nhập nhiều hơn 2 ký tự',
                                            maxLength: 'Yêu cầu nhập ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={4}>Ngày Sinh:</Label>
                                <Col md={8}>
                                    <Control.text model=".doB"
                                        type="date"
                                        className="form-control"
                                        name='doB'
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model='.doB'
                                        show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty:</Label>
                                <Col md={8}>
                                    <Control.text model=".startDate"
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model='.startDate'
                                        show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={4}>Phòng ban:</Label>
                                <Col md={8}>
                                    <Control.select model=".department"
                                        className="form-control"
                                        defaultValue='Sale'
                                        name='department'
                                    >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương:</Label>
                                <Col md={8}>
                                    <Control.text model=".salaryScale"
                                        className="form-control"
                                        name="salaryScale"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại:</Label>
                                <Col md={8}>
                                    <Control.text model=".annualLeave"
                                        className="form-control"
                                        name="annualLeave"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm:</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime"
                                        className="form-control"
                                        name="overTime"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 4 }}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default StaffList;
