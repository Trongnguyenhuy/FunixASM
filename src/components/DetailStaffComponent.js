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

// Đặt điều kiện cho input: đòi hỏi nhập, chiều dài nhập vào tối thiểu và tối đa số ký tự
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

// Function component nhận vào 2 props item và toggleModal để reder ra thông tin chi tiết nhân viên và button update nội dung
const RenderDetailStaff = ({ item, toggleModal }) => {

  document.title = `${item.name} || Ứng dụng quản lý nhân sự`;

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
          <Card
            body
            style={{
              borderColor: '#333'
            }}
          >
            <CardBody className="row">
              <div className="col-12 col-md-3 col-sm-4">
                <CardImg
                  alt={item.name}
                  src={item.image}
                  top
                  width="100%"
                />
              </div>
              <div className="col-12 col-md-9 col-sm-8">
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
                  Phòng ban: {item.department.name}
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
        </div>
      </div>
    </React.Fragment>
  );
}

// Class component reder ra card nhân viên và modal update nội dung gồm:
// local state isModalOpen kiểm soát trạng thái đóng mở của modal update
// Method toggleModal set giá trị của local state isModalOpen
// Method handleSubmit đóng modal, gọi hàm updateStaffs ở main component thông qua props
//Form trong modal sử dụng react-redux-form để kiểm soát nhập dữ liệu form
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
    const newStaff = { ...values };
    newStaff.id = this.props.item.id;
    console.log("Current state is: " + JSON.stringify(newStaff));
    this.props.updateStaff(newStaff);
  }

  render() {
    if (this.props.item === undefined) {
      return (
        <div className="text-center">
          <h3>Nhân viên không tồn tại !!!</h3>
        </div>
      );
    } else {
      return (
        <div className="container">
          <RenderDetailStaff item={this.props.item}
            removeStaff={this.props.removeStaff}
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
                      defaultValue={this.props.item.name}
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
                      defaultValue={this.props.item.doB}
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
                      defaultValue={this.props.item.startDate}
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
                      name='department'
                      defaultValue={this.props.item.department.name}
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
                      defaultValue={this.props.item.salaryScale}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại:</Label>
                  <Col md={8}>
                    <Control.text model=".annualLeave"
                      className="form-control"
                      name="annualLeave"
                      defaultValue={this.props.item.annualLeave}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm:</Label>
                  <Col md={8}>
                    <Control.text model=".overTime"
                      className="form-control"
                      name="overTime"
                      defaultValue={this.props.item.overTime}
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
