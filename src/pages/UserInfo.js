import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

const UserInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.users);
    console.log(" users= ", users);
    const singleUser = users.find((item) => item.id === Number(id));

    return (
        <div style={{ marginTop: "100px" }}>
            <div
                className="row"
                style={{
                    margin: "auto",
                    paddding: "15px",
                    maxWidth: "450px",
                    alignContent: "center",
                }}>
                <p className="col-md-12 fs-3">User Detail</p>
                <hr />
                <p className="col-md-6 fw-bold">ID: </p>
                <p className="col-md-6">{singleUser.id}</p>
                <p className="col-md-6 fw-bold">Name: </p>
                <p className="col-md-6">{singleUser.name}</p>
                <p className="col-md-6 fw-bold">Email: </p>
                <p className="col-md-6">{singleUser.email}</p>
                <p className="col-md-6 fw-bold">Phone: </p>
                <p className="col-md-6">{singleUser.phone}</p>
                <p className="col-md-6 fw-bold">Address: </p>
                <p className="col-md-6">{singleUser.address}</p>
            </div>
            <MDBBtn onClick={() => navigate("/")} color="danger">
                Go Back
            </MDBBtn>
        </div>
    );
};

export default UserInfo;
