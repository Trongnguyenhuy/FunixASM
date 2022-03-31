/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import {
  Card, CardImg, CardBody, CardTitle,
  Button, Label, Col, Row,
  Modal, ModalHeader, ModalBody, BreadcrumbItem, Breadcrumb, CardText
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

const findDepartment = (departmentId, departments) => {
  const department = departments.filter((item) => item.id === departmentId)[0];

  return department.name;
}

const RenderDetailStaff = ({ item, toggleModal, departments }) => {
  return (
    <React.Fragment>
      <div className="row mt-2">
        <Breadcrumb>
          <Link to="/stafflist">Nhân Viên</Link>
          <BreadcrumbItem>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {item.name}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12">
          <FadeTransform in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}
          >
            <Card
              body
              style={{
                borderColor: '#333'
              }}
            >
              <CardBody className="row">
                <div className="col-12 col-md-7 col-sm-7">
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    top
                    width="100%"
                  />
                </div>
                <div className="col-12 col-md-5 col-sm-5 align-self-center">
                  <CardTitle tag="h5">
                    {item.name}
                  </CardTitle>
                  <CardText>
                    Ngày sinh: {dateFormat(item.doB, 'dd/mm/yyyy')}
                  </CardText>
                  <CardText>
                    Ngày vào công ty: {dateFormat(item.startDate, 'dd/mm/yyyy')}
                  </CardText>
                  <CardText>
                    Phòng ban: {findDepartment(item.departmentId, departments)}
                  </CardText>
                  <CardText>
                    Số ngày nghỉ còn lại: {item.annualLeave}
                  </CardText>
                  <CardText>
                    Số ngày đã làm thêm: {item.overTime}
                  </CardText>
                  <Button onClick={() => { toggleModal() }}>
                    Cập nhật
                  </Button>
                </div>
              </CardBody>
            </Card>
          </FadeTransform>
        </div>
      </div >
    </React.Fragment >
  );
}


export default class DetailStaff extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

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
    const updateStaff = { ...values };
    updateStaff.id = this.props.staff.id;
    updateStaff.image = '/assets/images/alberto.png';
    console.log("Current state is: " + JSON.stringify(updateStaff));
    this.props.updateStaff(updateStaff);
  }

  render() {
    if (this.props.staffIsLoading || this.props.departmentIsLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffErrMess !== null || this.props.departmentErrMess !== null) {

      const errMess = this.props.staffErrMess !== null ? this.props.staffErrMess : this.props.departmentErrMess;
      return (
        <div className="container">
          <div className="row">
            <h4>{errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.staff !== null && this.props.departments !== null) {
      return (
        <div className="container">
          <RenderDetailStaff item={this.props.staff}
            departments={this.props.departments}
            toggleModal={this.toggleModal}
          />
          <Modal isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
          >
            <ModalHeader toggle={this.toggleModal}>
              Cập nhật thông tin
            </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}>Tên:</Label>
                  <Col md={8}>
                    <Control.text model=".name"
                      className="form-control"
                      name="name"
                      defaultValue={this.props.staff.name}
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
                      defaultValue={this.props.staff.doB}
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
                      defaultValue={this.props.staff.startDate}
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
                    <Control.select model=".departmentId"
                      className="form-control"
                      name='department'
                      defaultValue={this.props.staff.departmentId}
                    >
                      <option value='Dept01'>Sale</option>
                      <option value='Dept02'>HR</option>
                      <option value='Dept03'>Marketing</option>
                      <option value='Dept04'>IT</option>
                      <option value='Dept05'>Finance</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="salaryScale" md={4}>Hệ số lương:</Label>
                  <Col md={8}>
                    <Control.text model=".salaryScale"
                      className="form-control"
                      name="salaryScale"
                      defaultValue={this.props.staff.salaryScale}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại:</Label>
                  <Col md={8}>
                    <Control.text model=".annualLeave"
                      className="form-control"
                      name="annualLeave"
                      defaultValue={this.props.staff.annualLeave}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm:</Label>
                  <Col md={8}>
                    <Control.text model=".overTime"
                      className="form-control"
                      name="overTime"
                      defaultValue={this.props.staff.overTime}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 6, offset: 4 }}>
                    <Button type="submit" color="primary">
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }
}
