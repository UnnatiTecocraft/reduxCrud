import React, { useState } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarLink,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBIcon,
    MDBCollapse,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <>
            <MDBNavbar expand="lg" light bgColor="primary">
                <MDBContainer fluid>
                    <MDBNavbarBrand className="text-white">
                        <span style={{ marginRight: "10px" }}>
                            <MDBIcon fas icon="book-open" />
                        </span>
                        Contact
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle Navigation"
                        className="text-white"
                        onClick={() => setShowBasic(!showBasic)}>
                        <MDBIcon fas icon="bars" />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink to="/" className="text-white">
                                        Home
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink
                                        to="/addUser"
                                        className="text-white">
                                        AddUser
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {/*<MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink
                                        to="/editUser"
                                        className="text-white">
                                        EditUser
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink
                                        to="/userInfo"
                                        className="text-white">
                                        UserInfo
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>*/}
                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink to="/about" className="text-white">
                                        About
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
};

export default Header;
