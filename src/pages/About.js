import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

const About = () => {
    return (
        <div style={{ marginTop: "100px", padding: "100px" }}>
            <MDBTypography note noteColor="primary">
                Hey guys, this is full CRUD Application with the help of React
                JS. We have use Redux-saga to perform all CRUD operation in this
                Application. In this application we have also routing facility
                as well. We have use MDBBootstrap 5 to build the component like
                Table, Form, Navber, Button, etc in this React Application.
            </MDBTypography>
        </div>
    );
};

export default About;
