import React from 'react';
import { Card, CardBody, CardTitle, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

// Function component render ra các card bootstrap phòng ban.
// 

export default function Department(props) {
    document.title = `Phòng Ban || Ứng dụng quản lý nhân sự`;

    const department = props.departments.map((item, index) => {
        return (
            <div key={index} className='col-12 col-sm-6 col-md-4 mt-1'>
                <Card >
                    <CardBody>
                        <CardTitle tag='h5'>{item.name}</CardTitle>
                        <CardText>Số lượng nhân viên: {props.staffs.filter((staff) => staff.department.name === item.name).length}</CardText>
                        {/* số lượng nhân viên trong mỗi phòng ban được tính bằng độ dài mảng trả về bởi hàm filter khi lọc tên 
                        phòng ban trong mảng các nhân viên */}
                    </CardBody>
                </Card>
            </div>
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
                        Phòng Ban
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {department}
            </div>
        </div>
    )
}
