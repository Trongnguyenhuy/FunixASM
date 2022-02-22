import { Component } from "react";


class StaffList extends Component {

    renderListStaff = () => {
        return this.props.staffs.map((staff) => {
            return (
                <div className="col-12 col-md-4 col-lg-2 mt-2"
                    key={staff.id}>
                    <div className="card border border-dark"
                        onClick={() => this.props.onClick(staff.id)}
                        style={{cursor: 'pointer'}}>
                        <img className="card-img-top" src={staff.image} alt={staff.name}
                            style={{ width: '100%' }} />
                        <div className="card-body bg-secondary p-2"
                            style={{height: '130px'}}>
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
                <div className="row">
                    {this.renderListStaff()}
                </div>
            </div>
        );
    }
}

export default StaffList;