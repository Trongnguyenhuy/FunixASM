import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Form, FormGroup, Col, Input, Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleSearch(event) {
        console.log("Search word: " + this.search.value);
        this.props.searchStaff(this.search.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto' href='/'>
                            <img src="./assets/images/logo.png"
                                alt="logo"
                                height="60"
                                width="60"
                            />
                        </NavbarBrand>
                        <Collapse navbar isOpen={this.state.isNavOpen}>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/stafflist">
                                        <span className="fa fa-users fa-lg"></span>{' '}Nhân Viên
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/department">
                                        <span className="fa fa-id-card-o fa-lg"></span>{' '}Phòng Ban
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-money fa-lg"></span>{' '}Bảng Lương
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <Form onSubmit={this.handleSearch}>
                                    <FormGroup row>
                                        <Col xs={8}>
                                            <Input type='text'
                                                id='search'
                                                name='search'
                                                innerRef={(input) => this.search = input}
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <Button type='submit' value='submit'
                                                className='btn btn-primary' outline
                                            >
                                                <span className="fa fa-search fa-lg"></span>{' '}Search
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
