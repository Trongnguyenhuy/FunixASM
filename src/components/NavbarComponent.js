import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faIdCard, faUserTie } from "@fortawesome/free-solid-svg-icons";

export default class NavbarComponent extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark" 
                    style={{ backgroundColor: 'rgba(13,110,263,0.7)'}}>
                    <a className="navbar-brand" href="/">
                        <img src='./assets/images/logo.png' alt='logo' 
                            style={{height:'50px'}}/>
                    </a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                        data-target="/collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <span><FontAwesomeIcon icon={faUserTie} /> </span>
                                    Nhân Viên
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <span><FontAwesomeIcon icon={faIdCard} /> </span>
                                    Phòng Ban
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <span><FontAwesomeIcon icon={faPiggyBank} /> </span>
                                    Bảng Lương
                                </a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}
