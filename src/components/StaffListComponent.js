import react, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, 
        CardTitle} from "reactstrap";

class  StaffList extends Component {

    render() {
        const menu = this.props.staffs.map((staff) =>{
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={staff.id}>
                        {/* <CardImg width="100%" src={staff.image} alt={staff.name} /> */}
                        {/* <CardImgOverlay> */}
                            <CardBody>{staff.name}</CardBody>
                        {/* </CardImgOverlay> */}
                    </Card>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default StaffList;